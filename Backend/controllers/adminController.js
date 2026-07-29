import {
  getPendingOwners,
  approveOwner,
  rejectOwner,
  Allusers,
} from "../services/adminService.js";

export const ownerRequests = async (req, res) => {
  try {
    const requests = await getPendingOwners();

    res.status(200).json({
      success: true,

      data: requests,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const approveOwnerRequest = async (req, res) => {
  try {
    const owner = await approveOwner(req.params.id); //userid

    res.status(200).json({
      success: true,

      message: "Owner approved successfully.",

      data: owner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const rejectOwnerRequest = async (req, res) => {
  try {
    const owner = await rejectOwner(req.params.id);

    res.status(200).json({
      success: true,

      message: "Owner request rejected.",

      data: owner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const Allusersdata= async(req,res)=>{
  try {
    const users= await Allusers();
    res.status(200).json({
      success:true,
      message:"All Users fetched Successfully",
      data: users
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    })
    
  }
}
