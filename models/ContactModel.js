import { mongoose } from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  company: {
    type: String,
    required: [true, "Please provide a company name"],
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
  },
});

// If Contact model already exists, dont create a new one
const Contact =
  mongoose.models.jobs || mongoose.model("contacts", contactSchema);

export default Contact;
