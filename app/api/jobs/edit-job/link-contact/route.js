import connectDb from "@/config/connectDB";
import Job from "@/models/JobModel";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    // Extracting job id and the contact
    const reqBody = await request.json();
    const { jobId, contactId } = reqBody;

    // Finding by job id and updating the contact property of it, finally returning the job object with the populated contact subdocument
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      { $set: { contact: contactId } },
      { returnDocument: "after" },
    ).populate("contact");

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

export async function DELETE(request) {
  try {
    // Extracting job id and the contact
    const reqBody = await request.json();
    const { jobId } = reqBody;

    // Finding by job id and updating the contact property of it, finally returning the job object with the populated contact subdocument
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      { $unset: { contact: "" } },
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
