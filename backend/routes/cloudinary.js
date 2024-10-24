const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drqd2h01c',
  api_key: '516869759148963',
  api_secret: 'amexj9L8B6OynpDs2NEemdN0FjI'
});

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Image with public ID ${publicId} deleted successfully.`);
    return result;
  } catch (error) {
    console.error(`Failed to delete image with public ID ${publicId}:`, error);
    throw error;
  }
};

// Helper function to delete multiple images
const deleteMultipleImages = async (publicIds) => {
  try {
    const deletionPromises = publicIds.map((id) => deleteImage(id));
    const results = await Promise.all(deletionPromises);
    console.log("All images deleted successfully:", results);
    return results;
  } catch (error) {
    console.error("Error deleting images:", error);
    throw error;
  }
};

module.exports = {cloudinary,deleteImage,deleteMultipleImages};
