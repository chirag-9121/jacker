import connectDb from "@/config/connectDB";
import Job from "@/models/JobModel";
import { NextResponse } from "next/server";

connectDb();

export async function GET(request) {
  try {
    const reqBody = await request.json();
    // const { jobTitle, companyName, jobUrl, applicationDate, salary } = reqBody;

    // Creating and Saving new job
    const newJob = new Job(reqBody);

    const savedJob = await newJob.save();

    return NextResponse.json({
      message: "Added new job application.",
      success: true,
      savedJob,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
