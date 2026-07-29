import User from "../models/User.js";

export const createUser = async (userData) => {
    return await User.create(userData);
};

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const findUserById = async (id) => {
    return await User.findById(id).select("-password");
};

export const findUserByIdWithPassword = async (id) => {
    return await User.findById(id);
};

export const updateUser = async (id, updatedData) => {
    return await User.findByIdAndUpdate(
        id,
        updatedData,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");
}

export const getusers = async () => {
    return await User.find().select("-password");
}