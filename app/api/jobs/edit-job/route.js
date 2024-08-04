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
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
