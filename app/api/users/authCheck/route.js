import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Retrieve the token from the cookies
    const token = request.cookies.get("userAuthToken")?.value || "";

    // Verify and decode the token using the secret key
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // Extract user ID from the authentication token
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
