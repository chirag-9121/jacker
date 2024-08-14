import { mongoose } from "mongoose";

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  },
  phoneNumber: new mongoose.Schema({
    countryIso2: String,
    number: String,
  }),
});

// If Contact model already exists, dont create a new one
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
