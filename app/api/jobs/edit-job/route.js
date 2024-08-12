import connectDb from "@/config/connectDB";
import Job from "@/models/JobModel";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    // Extracting job id and job object from post request
    const reqBody = await request.json();
    const jobId = reqBody.jobId;
    const { jobTitle, company, jobUrl, applicationDate, salary } = reqBody.job;

    // Creating update object
    const update = {
      jobTitle: jobTitle,
      company: company,
      jobUrl: jobUrl,
      applicationDate: applicationDate,
      salary: salary,
    };

    // Updating Job model document
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      { $set: update },
      { runValidators: true, context: "query" },
      { returnDocument: "after" },
    );

    if (updatedJob) {
      //   const data = {
      //     jobTitle: jobTitle,
      //     company: company,
      //     jobUrl: jobUrl,
      //     applicationDate: applicationDate,
      //     salary: salary,
      //   };

      return NextResponse.json({
        message: "Profile updated!",
        success: true,
        updatedJob,
      });
    }
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
      { error: "Oops that didn't work" },
      { status: 500 },
    );
  }
}
