import React from "react";
import jobFeaturesImage from "@/public/job-tracker-features.png";
import Image from "next/image";

export function JobTrackingFeatures() {
  return (
    <div className="flex h-91v items-center justify-center px-10 pt-10">
      <p className="text-center text-4xl font-bold dark:text-white">
        Say bye 👋 to <br />
        <span className="text-[#19682C]">Excel</span> <span> sheets</span>
      </p>

      <div className="relative h-full w-3/4">
        <Image
          className="object-contain"
          fill
          src={jobFeaturesImage}
          alt="job features image"
        />
      </div>
    </div>
  );
}
