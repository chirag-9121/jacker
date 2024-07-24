import connectDb from "@/config/connectDB";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { ReturnDocument } from "mongodb";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { id, fname, lname, password } = reqBody;
    let hashedPassword;

    // Creating update object
    const update = {
      fname: fname,
      lname: lname,
    };

    if (password) {
      // If api was called from Profile Update Form (It contains userId)
      // Hashing password
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);

      // Adding password field in update object
      update.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: update },
      { returnDocument: "after" },
    );
    if (updatedUser) {
      return NextResponse.json({
        message: "Profile updated!",
        success: true,
        updatedUser,
      });
      // const data = {
      //   fname: updatedUser.fname,
      //   lname: updatedUser.lname,
      //   email: updatedUser.email,
      // };
      // const response = NextResponse.json({
      //   message: "Profile updated!",
      //   success: true,
      //   data,
      // });

      // const token = createToken(reqBody.userId, fname, lname, email);

      // response.cookies.set("userAuthToken", token, {
      //   httpOnly: true, // Ensures that the cookie is only accessible on the server side
      // });

      // return response;
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
