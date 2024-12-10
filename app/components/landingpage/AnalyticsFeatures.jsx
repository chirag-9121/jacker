import React from "react";
import analyticsFeaturesImage from "@/public/analytics-features.png";
import Link from "next/link";
import Image from "next/image";

export function AnalyticsFeatures() {
  return (
    <div className="flex h-[50vh] flex-col-reverse items-center justify-around px-2 pt-20 sm:h-91v sm:flex-row sm:px-10 sm:pt-0">
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-10">
        <p className="text-center text-xl font-bold dark:text-white sm:text-4xl">
          <span className="text-primary">Analyze</span> and track <br />
          <span> your</span> <span className="text-primary">progress</span>
        </p>

        <Link href="/login">
          <button className="rounded-lg bg-black px-2 py-2 text-center text-xs font-medium text-white hover:bg-cardcolor dark:bg-primary-light dark:text-black dark:hover:bg-primary-light/90 sm:px-6 sm:py-2.5 sm:text-sm">
            Get Started Now
          </button>
        </Link>
      </div>

      <div className="relative h-3/4 w-full sm:h-full sm:w-1/2">
        <Image
          className="object-contain"
          fill
          src={analyticsFeaturesImage}
          alt="analytics features image"
        />
      </div>
    </div>
  );
}
