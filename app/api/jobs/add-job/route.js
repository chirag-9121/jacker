import connectDb from "@/config/connectDB";
import Job from "@/models/JobModel";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const userId = reqBody.userId;
    const { jobTitle, company, jobUrl, applicationDate, salary } = reqBody.job;

    // Creating and Saving new job
    const newJob = new Job({
      userId: userId,
      jobTitle: jobTitle,
      company: company,
      jobUrl: jobUrl,
      applicationDate: applicationDate,
      salary: salary,
    });

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
