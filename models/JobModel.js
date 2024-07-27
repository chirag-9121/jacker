import { mongoose } from "mongoose";
import Contact from "./ContactModel";

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, "Please provide a job title"],
  },
  company: {
    type: String,
    required: [true, "Please provide a company name"],
  },
  jobUrl: {
    type: String,
    required: [true, "Please provide a job url"],
    unique: true,
  },
  salary: {
    type: Number,
    min: 0, // Expected salary can't be negative
  },
  applicationDate: {
    type: Date,
    required: [true, "Please provide an application date"],
  },
  contact: {
    type: Object,
    ref: Contact,
  },
  response: {
    type: String,
    enum: ["Pending", "Positive", "Rejection"], // Ensures only these values are allowed
    default: "Pending",
  },
  followUpDate: {
    type: Date,
  },
});

// If Job model already exists, dont create a new one
const Job = mongoose.models.jobs || mongoose.model("jobs", jobSchema);

export default Job;
