// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../utils/cloudinary.js";

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "profile_photos",
//         allowed_formats: ["jpg", "jpeg", "png"],
//     },
// });

// const upload = multer({
//     storage,
// });

// export default upload;


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "RentRide",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    })
});

const uploadMiddleware = multer({
    storage
});

export default uploadMiddleware;