import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import { currentUser } from "@clerk/nextjs/server";

// To check if user is authenticated or not
export async function GET(request) {
  try {
    const user = await currentUser(); // Get Clerk's authenticated user

    console.log("CURRENT USER:", user);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userEmail = user.emailAddresses[0].emailAddress;
    // Fetch user from database
    const dbUser = await User.findOne({ email: userEmail });

    console.log("DB USER:", dbUser);

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Extract user data from the authentication token
    const userDetails = {
      id: dbUser._id,
      fname: dbUser.fname,
      lname: dbUser.lname,
      email: dbUser.email,
    };

    return NextResponse.json({
      success: true,
      message: "User found",
      data: userDetails,
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
