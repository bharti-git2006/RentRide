import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            default: ""
        },

        profilePhoto: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            enum: ["customer", "owner", "admin"],
            default: "customer"
        },

        ownerStatus: {
            type: String,
            enum: ["none", "pending", "approved", "rejected"],
            default: "none"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// const User = mongoose.model("User", userSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema); // to avoid OverWriteModelError bug

export default User;