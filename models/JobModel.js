import { mongoose } from "mongoose";

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  },
  salary: {
    type: Number,
    min: 0, // Expected salary can't be negative
    default: undefined,
  },
  applicationDate: {
    type: Date,
    required: [true, "Please provide an application date"],
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
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
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
