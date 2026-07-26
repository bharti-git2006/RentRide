import bcrypt from "bcrypt";

import {
    createUser,
    findUserByEmail,
    updateOwnerStatus,
    updateUserRole
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

export const applyForOwner = async (userId) => {
    const updatedUser = await updateOwnerStatus(userId, "pending");

    if (!updatedUser) {
        throw new Error("User not found");
    }

    return {
        message: "Owner request submitted successfully"
    };
};

export const approveOwner = async (userId) => {
    const user = await updateOwnerStatus(userId, "approved");

    if (!user) {
        throw new Error("User not found");
    }

    await updateUserRole(userId, "owner");

    return {
        message: "Owner request approved"
    };
};

