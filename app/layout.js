import { Nunito } from "next/font/google"; // Defining global font
import "./globals.css";

// Components
import Navbar from "@/app/components/navbar/Navbar";
import UserProvider from "@/app/components/UserProvider";
import ThemeProvider from "@/app/components/ThemeProvider";

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
      <body
        suppressHydrationWarning={true}
        className={`${nunito.className} h-screen bg-lightbackground dark:bg-darkbackground`}
      >
        {/* Navbar and children components wrapped around global context providers */}
        <ThemeProvider>
          <UserProvider>
            <Navbar />
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
