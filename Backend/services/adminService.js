import User from "../models/User.js";
import {getusers} from "../repositories/userRepository.js"

export const getPendingOwners = async () => {
    return await User.find(
        {
            ownerStatus: "pending"
        }
    ).select("-password");

};

export const approveOwner = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {

        throw new Error(
            "User not found."
        );

    }

    if (user.ownerStatus !== "pending") {
        throw new Error(
            "This user does not have a pending owner request."
        );

    }

    user.role = "owner";
    user.ownerStatus = "approved";

    await user.save();
    user.password = undefined;
    return user;

};

export const rejectOwner = async (userId) => {

    const user = await User.findById(
        userId
    );

    if (!user) {

        throw new Error(
            "User not found."
        );

    }

    if (user.ownerStatus !== "pending") {

        throw new Error( "This user does not have a pending owner request.");
    }
    user.ownerStatus = "rejected";
    await user.save();
    user.password = undefined;
    return user;

};

export const Allusers= async()=>{
    const users= await getusers();
    return users.filter((user)=>(user.role!=="admin"));

}
