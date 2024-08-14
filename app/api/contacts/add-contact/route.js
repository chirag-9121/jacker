import connectDb from "@/config/connectDB";
import Contact from "@/models/ContactModel";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const userId = reqBody.userId;
    const { fullName, company, email, phoneNumber } = reqBody.contactDetails;

    // Creating and Saving new Contact
    const newContact = new Contact({
      userId: userId,
      fullName: fullName,
      company: company,
      email: email,
      phoneNumber: phoneNumber,
    });

    const savedContact = await newContact.save();

    return NextResponse.json({
      message: "Added new contact.",
      success: true,
      savedContact,
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
