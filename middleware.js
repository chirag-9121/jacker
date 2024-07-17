import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  // Defining paths that can be accessible without a token
  const isPublicPath = path === "/" || path === "/login" || path === "/signup";
  const token = request.cookies.get("userAuthToken")?.value || "";

  // If accessing public paths while logged in
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/job-tracker", request.nextUrl));
  }

  // if accessing protected paths without login/token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// It specifies the paths for which this middleware should be executed.
export const config = {
  matcher: ["/", "/contacts", "/job-tracker", "/profile", "/login", "/signup"],
};
