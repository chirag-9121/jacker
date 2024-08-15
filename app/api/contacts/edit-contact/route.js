import connectDb from "@/config/connectDB";
import Contact from "@/models/ContactModel";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    // Extracting contact id and contact object from post request
    const reqBody = await request.json();
    const contactId = reqBody.contactId;
    const { fullName, company, email, countryIso2, number } = reqBody.contact;

    // Creating update object
    const update = {
      fullName: fullName,
      company: company,
      email: email,
      phoneNumber: {
        countryIso2: countryIso2,
        number: number,
      },
    };

    // Updating Contact model document
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId },
      { $set: update },
      { runValidators: true, context: "query" },
      { returnDocument: "after" },
    );

    if (updatedContact) {
      return NextResponse.json({
        message: "Contact updated!",
        success: true,
        updatedContact,
      });
    }
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
