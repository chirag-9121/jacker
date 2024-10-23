import React from "react";
import heroImageLight from "@/public/hero-illustration-light.png";
import heroImageDark from "@/public/hero-illustration-dark.png";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative h-91v">
      <div className="flex flex-col items-center justify-center gap-10 p-12">
        <p className="text-center text-4xl font-bold dark:text-white">
          Track all your job applications <br /> in
          <span className="text-primary"> one place.</span>
        </p>

        <Link href="/signup">
          <button className="w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cardcolor dark:bg-primary-light dark:text-black dark:hover:bg-primary-light/90">
            Get Started
          </button>
        </Link>

        {/* Hero image */}
        <Image
          className="block dark:hidden"
          width={500}
          height={500}
          src={heroImageLight}
          alt="hero image"
        />
        <Image
          className="hidden dark:block"
          width={500}
          height={500}
          src={heroImageDark}
          alt="hero image"
        />
      </div>

      {/* Blobs */}
      <svg
        className="absolute bottom-0 left-0 -z-10 h-64 w-64 fill-current text-primary-light dark:text-cardcolor"
        viewBox="0 0 434 424"
      >
        <path d="M69.026 0.049C169.638 -2.01501 255.505 61.4023 320.528 138.208C388.566 218.575 457.755 320 424.47 419.901C392.758 515.083 274.621 537.78 178.183 565.44C106.74 585.932 35.6873 578.924 -33.2686 551.191C-110.667 520.062 -194.097 483.95 -220.881 404.943C-250.346 318.025 -223.29 222.889 -169.861 148.268C-112.463 68.1048 -29.5461 2.07116 69.026 0.049Z" />
      </svg>

      <svg
        className="absolute -right-20 bottom-20 -z-10 h-96 w-96 fill-current text-primary-light dark:text-cardcolor"
        viewBox="0 0 365 663"
      >
        <path d="M345.309 0.000389522C443.61 -0.232931 498.476 104.4 557.852 182.744C614.411 257.37 682.956 333.465 668.11 425.919C652.385 523.845 575.132 601.033 484.291 640.841C397.318 678.955 301.028 662.893 213.993 624.922C121.601 584.614 20.2342 529.726 2.25615 430.541C-15.2426 334 72.8857 260.483 134.027 183.75C195.22 106.95 247.111 0.233463 345.309 0.000389522Z" />
      </svg>
    </div>
  );
}
