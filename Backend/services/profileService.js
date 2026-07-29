import bcrypt from "bcrypt";

import {
  findUserById,
  findUserByIdWithPassword,
  updateUser,
} from "../repositories/userRepository.js";

const getProfile = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

const updateProfile = async (userId, userData) => {
  const updatedUser = await updateUser(userId, userData);

  if (!updatedUser) {
    throw new Error("Unable to update profile.");
  }

  return updatedUser;
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await findUserByIdWithPassword(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordMatched) {
    throw new Error("Current password is incorrect.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await updateUser(userId, {
    password: hashedPassword,
  });

  return updatedUser;
};

const changeProfilePhoto = async (userId, profilePhoto) => {
  const updatedUser = await updateUser(userId, { profilePhoto });

  if (!updatedUser) {
    throw new Error("Unable to update profile photo.");
  }

  return updatedUser;
};

export const becomeOwner = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  if (user.role === "Owner") {
    throw new Error("You are already an owner.");
  }

  if (user.ownerStatus === "Pending") {
    throw new Error("Your application is already under review.");
  }

  user.ownerStatus = "pending";
  await user.save();

  return user;
};

export { getProfile, updateProfile, changePassword, changeProfilePhoto };
