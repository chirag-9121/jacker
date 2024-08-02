import connectDb from "@/config/connectDB";
import Job from "@/models/JobModel";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    // Extracting job id and the updated response (eg. positive || rejection)
    const reqBody = await request.json();
    const jobId = reqBody.jobId;
    const updatedResponse = reqBody.updatedResponse;

    // Finding by job id and updating the response property of it
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      { $set: { response: updatedResponse } },
      { returnDocument: "after" },
    );

    // Once updated sending a successful response
    if (updatedJob) {
      return NextResponse.json({
        success: true,
      });
    } else throw Error;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
