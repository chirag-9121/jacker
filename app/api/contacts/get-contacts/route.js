import connectDb from "@/config/connectDB";
import Contact from "@/models/ContactModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

connectDb();

export async function GET(request) {
  try {
    // Parsing userId from search parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Fetching all contacts associated with a specific user
    const contacts = await Contact.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }, // First stage: Match documents by userId
      },
      {
        // Project the results in the below format
        $project: {
          fullName: 1, // Include the fullName field
          company: 1,
          email: 1,
          countryIso2: "$phoneNumber.countryIso2", // Create a new field "countryIso2" with the value from phoneNumber.countryIso2
          number: "$phoneNumber.number",
        },
      },
    ]);

    // Returning 404 response if there are no contacts
    if (!contacts)
      return NextResponse.json(
        { error: "No contacts to display" },
        { status: 404 },
      );

    console.log(contacts);

    // Returning 200 response with contacts object
    return NextResponse.json({
      success: true,
      contacts,
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
