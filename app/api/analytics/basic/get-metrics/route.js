import Job from "@/models/JobModel";
import Contact from "@/models/ContactModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Parsing userId from search parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Tiles Data
    const totalJobApplications = await Job.countDocuments({ userId: userId });
    const totalPositiveResponses = await Job.countDocuments({
      userId: userId,
      response: "Positive",
    });
    const uniqueCompaniesAppliedTo = await Job.distinct("company", {
      userId: userId,
    });
    const totalContacts = await Contact.countDocuments({ userId: userId });

    const tiles = {
      totalJobApplications,
      totalPositiveResponses,
      uniqueCompaniesAppliedTo: uniqueCompaniesAppliedTo.length,
      totalContacts,
    };

    const basicMetrics = {
      tiles,
    };
    // Returning 200 response with metrics object
    return NextResponse.json({
      success: true,
      basicMetrics,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
