import connectDb from "@/config/connectDB";
import Job from "@/models/JobModel";
import { NextResponse } from "next/server";

connectDb();

export async function GET(request) {
  try {
    // Parsing userId from search parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Fetching all jobs associated with a specific user
    const jobs = await Job.find({ userId: userId }).populate("contact");

    // Returning 404 response if there are no jobs
    if (!jobs)
      return NextResponse.json(
        { error: "No jobs to display" },
        { status: 404 },
      );

    // Returning 200 response with jobs object
    return NextResponse.json({
      success: true,
      jobs,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
