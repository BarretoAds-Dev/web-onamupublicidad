import { v2 as cloudinary } from 'cloudinary';

// Configura Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  key_name: import.meta.env.CLOUDINARY_KEY_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;