import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI,
  NODE_ENV: process.env.NODE_ENV,
  ROUNDS: process.env.SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  STORE_ID: process.env.STORE_ID,
  STORE_PASSWD: process.env.STORE_PASSWD,
  IS_LIVE: process.env.IS_LIVE,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
