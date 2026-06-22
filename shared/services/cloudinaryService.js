const cloudinary = require("../../config/cloudinary");

const uploadFile = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      folder,
    });

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    throw new Error("Failed to upload file");
  }
};

module.exports = {
  uploadFile,
};