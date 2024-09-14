import Job from "@/models/JobModel";
import Contact from "@/models/ContactModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    // Parsing userId from search parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Tiles Data (retrieving total jobs, positive responses, unique companies and total contacts)
    const totalJobApplications = await Job.countDocuments({ userId: userId });
    const totalPositiveResponses = await Job.countDocuments({
      userId: userId,
      response: "Positive",
    });
    const uniqueCompaniesAppliedTo = await Job.distinct("company", {
      userId: userId,
    });
    const totalContacts = await Contact.countDocuments({ userId: userId });

    // Craeting tiles object to add to metrics object
    const tiles = {
      totalJobApplications,
      totalPositiveResponses,
      uniqueCompaniesAppliedTo: uniqueCompaniesAppliedTo.length,
      totalContacts,
    };

    // Line Chart (Total job applications over last 30 days)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const applicationsOverLast30Days = await Job.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          applicationDate: { $gte: last30Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d-%b", date: "$applicationDate" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    console.log(applicationsOverLast30Days);

    const metrics = {
      tiles,
      applicationsOverLast30Days,
    };
    // Returning 200 response with metrics object
    return NextResponse.json({
      success: true,
      metrics,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
