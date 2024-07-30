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
    const { fname, lname, email, password } = reqBody;

    // If user already exists in DB
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating and Saving new user
    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const response = NextResponse.json({
      message: "New user created.",
      success: true,
      savedUser,
    });

    // Creating token data to store user info (user id,fname,lname and email).
    const tokenData = {
      id: savedUser._id,
      fname: savedUser.fname,
      lname: savedUser.lname,
      email: savedUser.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    response.cookies.set("userAuthToken", token, {
      httpOnly: true, // Ensures that the cookie is only accessible on the server side
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
