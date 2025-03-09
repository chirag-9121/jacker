import { Webhook } from "svix";
import { headers } from "next/headers";
import { createClerkClient } from "@clerk/nextjs/server";
import User from "@/models/UserModel";
import connectDb from "@/config/connectDB";

connectDb();

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const userDetails = {
      fname: evt.data.first_name,
      lname: evt.data.last_name,
      email: evt.data.email_addresses[0].email_address,
    };

    // If user already exists in DB
    const user = await User.findOne({ email: userDetails.email });
    if (user) {
      return new Response("User already exists", { status: 400 });
    }

    // Creating and Saving new user
    const newUser = new User(userDetails);

    await newUser.save();
    const response = await clerkClient.users.getUser(evt.data.id);
    return new Response("New user created.", { status: 200 });
  }

  if (eventType === "session.created") {
    const response = await clerkClient.users.getUser(evt.data.user_id);
    return new Response("User login successful.", { status: 200 });
  }

  return new Response("Webhook received", { status: 200 });
}
