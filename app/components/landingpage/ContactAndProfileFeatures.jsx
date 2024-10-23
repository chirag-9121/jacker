import React from "react";
import contactProfileFeaturesImage from "@/public/contact-and-profile-features.png";
import Image from "next/image";

export function ContactAndProfileFeatures() {
  return (
    <div className="flex h-91v items-center justify-around px-10">
      <div className="relative h-full w-1/2">
        <Image
          className="object-contain"
          fill
          src={contactProfileFeaturesImage}
          alt="contact & profile features image"
        />
      </div>

      <p className="text-center text-4xl font-bold dark:text-white">
        Add <span className="text-primary">Contacts</span>, <br />
        <span className="text-primary">Update</span> <span> Profile</span>
      </p>
    </div>
  );
}
