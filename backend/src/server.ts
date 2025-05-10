import mongoose from "mongoose";
import config from "./config";
import app from "./app";


const PORT = config.PORT;

const server = async () => {
  try {
    await mongoose.connect(config.DB_URI as string);
    console.log(`DB connected successfully`);
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

server();
