import connectDb from "@/config/connectDB";
import Job from "@/models/JobModel";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    // Extracting job id and the updated follow up date
    const reqBody = await request.json();
    const jobId = reqBody.jobId;
    const followUpDate = reqBody.followUpDate;

    // Finding by job id and updating the respective property of it
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      { $set: { followUpDate: followUpDate } },
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
