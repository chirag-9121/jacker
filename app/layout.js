import { Nunito } from "next/font/google"; // Defining global font
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Components
import Navbar from "@/app/components/navbar/Navbar";
import UserProvider from "@/app/components/UserProvider";
import ThemeProvider from "@/app/components/ThemeProvider";
import ProgressBarProvider from "@/app/ProgressBarProvider";

const nunito = Nunito({ subsets: ["latin"] });

// metadata used for SEO optimization
export const metadata = {
  title: "Jacker",
  description: "Job Tracking Application",
};

// App starts here in the root layout and children pages gets appended
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        {/* To avoid initial flash of default theme, fetching localstorage theme if available or system theme */}
        <head>
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const theme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.className = theme || systemTheme;
                })();
              `,
            }}
          />
        </head>

        <body
          suppressHydrationWarning={true}
          className={`${nunito.className} h-screen bg-lightbackground dark:bg-darkbackground`}
        >
          {/* Navbar and children components wrapped around global context providers */}
          <ProgressBarProvider>
            <ThemeProvider>
              <UserProvider>
                <Navbar />
                <div className="overflow-hidden">{children}</div>
              </UserProvider>
            </ThemeProvider>
          </ProgressBarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
