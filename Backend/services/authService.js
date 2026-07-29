import bcrypt from "bcrypt";

import {
    createUser,
    findUserByEmail,
} from "../repositories/userRepository.js";

import generateToken from "../utils/generateToken.js";

export const signup = async (userData) => {
    const { name, email, password} = userData;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
        name,
        email,
        password: hashedPassword,
    });

    return {
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
    };
};

export const login = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    return {
        token,
        role: user.role,
        name:user.name
    };
};

