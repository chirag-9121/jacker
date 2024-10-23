import React from "react";
import analyticsFeaturesImage from "@/public/analytics-features.png";
import Link from "next/link";
import Image from "next/image";

export function AnalyticsFeatures() {
  return (
    <div className="flex h-91v items-center justify-around px-10">
      <div className="flex flex-col items-center justify-center gap-10">
        <p className="text-center text-4xl font-bold dark:text-white">
          <span className="text-primary">Analyze</span> and track <br />
          <span> your</span> <span className="text-primary">progress</span>
        </p>

        <Link href="/signup">
          <button className="rounded-lg bg-black px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-cardcolor dark:bg-primary-light dark:text-black dark:hover:bg-primary-light/90">
            Get Started Now
          </button>
        </Link>
      </div>

      <div className="relative h-full w-1/2">
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
