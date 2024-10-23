import React from "react";
import { IoLogoGithub } from "react-icons/io";

export function HeroFooter({}) {
  return (
    <div className="flex w-full items-center justify-center pb-40">
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="font-semibold text-[#737373]">
          Made with ♡ by&nbsp;
          <a
            target="_blank"
            className="hover:text-primary"
            href="https://www.linkedin.com/in/chirag9121/"
          >
            Chirag Gupta
          </a>
        </p>
        <a
          target="_blank"
          className="transition-all hover:scale-125 dark:text-white"
          href="https://github.com/chirag-9121/jacker"
        >
          <IoLogoGithub size={30} />
        </a>
      </div>
    </div>
  );
}
