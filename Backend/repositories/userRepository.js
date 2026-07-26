import User from "../models/user.js";

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
};

export const updateUserRole = async (id, role) => {
    return await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
    ).select("-password");
};

export const updateOwnerStatus = async (id, ownerStatus) => {
    return await User.findByIdAndUpdate(
        id,
        { ownerStatus },
        { new: true }
    ).select("-password");
};

export const getAllUsers = async () => {
    return await User.find().select("-password");
};
