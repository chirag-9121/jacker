import { Nunito } from "next/font/google";
import "./globals.css";

// Components
import Navbar from "./components/Navbar";
import DarkTheme from "./components/DarkTheme";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Jacker",
  description: "Job Tracking Application",
};

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
