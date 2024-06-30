import mongoose from "mongoose";

async function connectDb() {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected");
    return true;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDb;
