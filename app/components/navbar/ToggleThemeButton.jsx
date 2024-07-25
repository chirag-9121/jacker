"use client";

import { DropdownMenuItem } from "@/app/components/ui/dropdown-menu";
import { Half2Icon } from "@radix-ui/react-icons";
import { useThemeContext } from "@/app/components/ThemeProvider";

// Light/ Dark mode toggle dropdown menu item component for userpfp actions

function ToggleThemeButton() {
  // Extracting 3 properties from Theme Global Context Provider
  // theme for checking current theme, setTheme to set new theme by toggling, colorTheme for text display in action button
  const { theme, setTheme, colorTheme } = useThemeContext();
  return (
    <DropdownMenuItem
      className="gap-2"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <Half2Icon />
      <span className="capitalize">{colorTheme} Theme</span>
    </DropdownMenuItem>
  );
}

export default ToggleThemeButton;
