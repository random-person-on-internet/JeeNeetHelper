import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("No file path provided");
    }
    // upload file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    // file has been uploaded seccesfully
    fs.unlinkSync(localFilePath);
    console.log("File is uploaded on cloudinary", response.url);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file
    throw error;
  }
};

export default uploadOnCloudinary;
