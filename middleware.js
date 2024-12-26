import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/job-tracker(.*)",
  "/profile(.*)",
  "/contacts(.*)",
]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/signup(.*)",
  "/login(.*)",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const token = request.cookies.get("userAuthToken")?.value || "";

  // // if accessing protected paths without login/token
  if (isProtectedRoute(request) && !token)
    return NextResponse.redirect(new URL("/login", request.nextUrl));

  // // If accessing public paths while logged in
  if (isPublicRoute(request) && token)
    return NextResponse.redirect(new URL("/job-tracker", request.nextUrl));
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
