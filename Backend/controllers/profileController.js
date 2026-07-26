import {
    getProfile,
    updateProfile,
    changePassword,
    changeProfilePhoto
} from "../services/profileService.js";

export const getUserProfile = async (req, res) => {
    try {

        const user = await getProfile(req.user.id);

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully.",
            data: user
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
};

export const updateUserProfile = async (req, res) => {
    try {

        const updatedProfile = await updateProfile(req.user.id, req.body);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: updatedProfile
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

export const changedPassword = async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        await changePassword(
            req.user.id,
            oldPassword,
            newPassword
        );

        res.status(200).json({
            success: true,
            message: "Password changed successfully."
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

export const updateProfilePhoto = async (req, res) => {
    try {

        const updatedProfile = await changeProfilePhoto(
            req.user.id,
            req.file.path
        );

        res.status(200).json({
            success: true,
            message: "Profile photo updated successfully.",
            data: updatedProfile
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};
