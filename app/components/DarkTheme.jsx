"use client";

import { useEffect } from "react";

function DarkTheme() {
  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");
    console.log("Theme ", selectedTheme);

    if (selectedTheme) {
      document.body.classList.add(selectedTheme);
    } else if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }
  }, []);
  return <></>;
}

export default DarkTheme;
