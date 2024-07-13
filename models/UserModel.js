import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  lname: {
    type: String,
    required: [true, "Please provide a last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please set a password"],
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
