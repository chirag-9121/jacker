import { NextResponse } from "next/server";

// Deleting the user cookie from browser, thus logging out
export async function GET(request) {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("userAuthToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
