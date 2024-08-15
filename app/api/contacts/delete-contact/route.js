import connectDb from "@/config/connectDB";
import Contact from "@/models/ContactModel";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const contactId = reqBody.contactId;

    const result = await Contact.findByIdAndDelete(contactId);

    if (result) {
      return NextResponse.json({
        message: "Contact deleted",
        success: true,
      });
    } else throw Error;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
