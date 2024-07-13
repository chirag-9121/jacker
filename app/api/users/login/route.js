import connectDb from "@/config/connectDB";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export async function POST(request) {
  try {
    // Extracting values from post request
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Checking if user exists
    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 },
      );

    // Checking password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });

    // Creating token data to store user info (user id,fname,lname and email).
    const tokenData = {
      id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    };

    // Generating token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      data: tokenData,
      message: "Login successful",
      success: true,
    });

    response.cookies.set("userAuthToken", token, {
      httpOnly: true, // Ensures that the cookie is only accessible on the server side
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
