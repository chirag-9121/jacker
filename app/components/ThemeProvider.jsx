"use client";

import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const ThemeContext = createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

// Theme Global Context Provider for toggling between light/dark theme
function ThemeProvider({ children }) {
  // Extracting system theme to set initial value for theme
  // Checking if window is available (typeof window !== "undefined"), only then performing window actions like setting localstorage, otherwise there is an initial flash
  if (typeof window !== "undefined") {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    var systemTheme = prefersDarkMode ? "dark" : "light";
  }

  // If localstorage variable exists, assign that, otherwise assign defualt system theme
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.theme
      ? localStorage.theme
      : systemTheme,
  );

  // This variable contains theme oppposite from current theme so that we can remove it from root and add new theme
  const colorTheme = theme === "dark" ? "light" : "dark";

  // Adding/removing theme classes to/from root element and setting new theme in localstorage
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    if (theme === "system") root.classList.add(systemTheme);
    else root.classList.add(theme);

    if (typeof window !== "undefined") localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
