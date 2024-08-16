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
    // If there is a validation error, check for the type and return response accordingly
    if (err.name === "ValidationError") {
      if (err.errors.salary) {
        return NextResponse.json(
          { error: "Be positive about salary expectations!" },
          { status: 400 },
        );
      } else if (err.errors.jobUrl) {
        return NextResponse.json(
          { error: "The job url didn't seem legit" },
          { status: 400 },
        );
      } else {
        return NextResponse.json(
          { error: "Invalid job url and negative salary expectations!" },
          { status: 400 },
        );
      }
    }
    // else might be some server error/bug
    return NextResponse.json(
      { error: "Oops! that didn't work" },
      { status: 500 },
    );
  }
}
