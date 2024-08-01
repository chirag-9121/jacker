import connectDb from "@/config/connectDB";
import Job from "@/models/JobModel";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const jobId = reqBody.jobId;

    const result = await Job.findByIdAndDelete(jobId);

    if (result) {
      return NextResponse.json({
        message: "Job application deleted",
        success: true,
      });
    } else throw Error;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
