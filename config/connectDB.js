import mongoose from "mongoose";

// Function to connect to the MongoDB database
async function connectDb() {
  // If already connected return true
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
