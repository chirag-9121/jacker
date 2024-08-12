import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
    required: [true, "Please provide a first name"],
  },
  lname: {
    type: String,
    trim: true,
    required: [true, "Please provide a last name"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please set a password"],
  },
});

// If User model already exists, dont create a new one
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
