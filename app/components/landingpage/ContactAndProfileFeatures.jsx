import React from "react";
import contactProfileFeaturesImage from "@/public/contact-and-profile-features.png";
import Image from "next/image";

export function ContactAndProfileFeatures() {
  return (
    <div className="flex h-[50vh] flex-col-reverse items-center justify-between px-2 pt-20 sm:h-91v sm:flex-row sm:justify-around sm:px-10 sm:pt-0">
      <div className="relative h-3/4 w-full sm:h-full sm:w-1/2">
        <Image
          className="object-contain"
          fill
          src={contactProfileFeaturesImage}
          alt="contact & profile features image"
        />
      </div>

      <p className="text-center text-xl font-bold dark:text-white sm:text-4xl">
        Add <span className="text-primary">Contacts</span>, <br />
        <span className="text-primary">Update</span> <span> Profile</span>
      </p>
    </div>
  );
}
