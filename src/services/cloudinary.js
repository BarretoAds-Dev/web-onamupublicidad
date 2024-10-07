import { v2 as cloudinary } from 'cloudinary';

// Configura Cloudinary con tus credenciales
envVarsCheck();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_KEY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verifica si las variables de entorno están definidas
function envVarsCheck() {
  const requiredVars = ['CCLOUDINARY_KEY_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
  requiredVars.forEach((variable) => {
    if (!process.env[variable]) {
      console.warn(`La variable de entorno ${variable} no está definida. Por favor, configúrala adecuadamente.`);
    }
  });
}

export default cloudinary;