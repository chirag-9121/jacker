import React from "react";
import jobFeaturesImage from "@/public/job-tracker-features.png";
import Image from "next/image";

export function JobTrackingFeatures() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-between px-2 pt-10 sm:h-91v sm:flex-row sm:justify-center sm:px-10">
      <p className="text-center text-xl font-bold dark:text-white sm:text-4xl">
        Say bye 👋 to <br />
        <span className="text-[#19682C]">Excel</span> <span> sheets</span>
      </p>

      <div className="relative h-3/4 w-full sm:h-full sm:w-3/4">
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
