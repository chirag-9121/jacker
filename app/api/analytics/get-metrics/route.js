import Job from "@/models/JobModel";
import Contact from "@/models/ContactModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const barChartClassNames = [
  "fill-primary", // First element gets full opacity
  "fill-primary/80", // Second element gets slightly faded
  "fill-primary/60", // and so on...
  "fill-primary/40",
  "fill-primary/20",
];

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

    // Creating tiles object to add to metrics object
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
            $dateToString: { format: "%b-%d", date: "$applicationDate" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Bar Chart (Top Job Titles applied to)
    const top5JobTitles = await Job.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: "$jobTitle",
          count: { $sum: 1 }, // Counting number of applications for each job title
        },
      },
      {
        $sort: { count: -1 }, // Sorts in desc order
      },
      {
        $limit: 5,
      },
    ]);

    const topJobTitles = top5JobTitles.map((job, index) => ({
      ...job, // Spreading the original job data
      className: barChartClassNames[index], // Assigning className based on index
    }));

    // Distribution of application responses (positive, pending, rejection)
    const responseDistribution = await Job.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: "$response",
          count: { $sum: 1 },
        },
      },
    ]);

    // Just the way shadcn charts work, have to have the some property that links to the chartConfig to render colors
    const applicationResponseDistribution = responseDistribution.map(
      (response) => ({
        ...response, // Spreading the original response data
        fill:
          response._id === "Pending"
            ? "var(--color-Pending)"
            : response._id === "Positive"
              ? "var(--color-Positive)"
              : "var(--color-Rejection)",
      }),
    );

    const metrics = {
      tiles,
      applicationsOverLast30Days,
      topJobTitles,
      applicationResponseDistribution,
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
