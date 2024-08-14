import { mongoose } from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: [true, "Please provide a name"],
  },
  company: {
    type: String,
    trim: true,
    required: [true, "Please provide a company name"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
});

// If Contact model already exists, dont create a new one
const Contact =
  mongoose.models.jobs || mongoose.model("Contact", contactSchema);

export default Contact;
