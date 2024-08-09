import jwt, { TokenExpiredError } from "jsonwebtoken";
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
      id: decodedToken.id,
      fname: decodedToken.fname,
      lname: decodedToken.lname,
      email: decodedToken.email,
    };

    return NextResponse.json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    // If token expiry error, set the usertoken to null and return 401 status response
    if (err instanceof TokenExpiredError) {
      const response = NextResponse.json(
        {
          message: "User token expired.",
        },
        { status: 401 },
      );
      response.cookies.set("userAuthToken", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      return response;
    } else return NextResponse.json({ error: err }, { status: 400 });
  }
}
