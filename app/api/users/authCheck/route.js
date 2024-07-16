import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// To check if user is authenticated or not
export async function GET(request) {
  try {
    // Retrieve the user auth token from the cookies
    const token = request.cookies.get("userAuthToken")?.value || "";

    // Verify and decode the token using the secret key
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // Extract user data from the authentication token
    const user = {
      fname: decodedToken.fname,
      lname: decodedToken.lname,
      email: decodedToken.email,
    };

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
