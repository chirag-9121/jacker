import { Nunito } from "next/font/google"; // Defining global font
import "./globals.css";

// Components
import Navbar from "./components/Navbar";
import DarkTheme from "./components/DarkTheme";

const nunito = Nunito({ subsets: ["latin"] });

// metadata used for SEO optimization
export const metadata = {
  title: "Jacker",
  description: "Job Tracking Application",
};

// App starts here in the root layout and children pages gets appended
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
