// "use client";

// import { useRouter } from "next/navigation";
// import axios from "axios"; // Used for making requests to server from browser
// import LoginForm from "./LoginForm";
// import { useState } from "react";
// import { useUserContext } from "../components/UserProvider";
// import { Toaster } from "@/app/components/ui/sonner";

// function Login() {
//   const router = useRouter();
//   const { setUser } = useUserContext();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();

//   // Login form submit handler function. Sends the user object to the server for processing.
//   const loginHandler = async (e, user) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post("/api/users/login", user);
//       if (response.status === 200) {
//         setUser(response.data.data);
//         router.refresh();
//         router.push("/job-tracker");
//       }
//     } catch (err) {
//       setError(err.response.data.error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <LoginForm loginHandler={loginHandler} isLoading={isLoading} error={error}>
//       {/* Sonner to display success msg, errors, info, etc. */}
//       <Toaster richColors />
//     </LoginForm>
//   );
// }

// export default Login;

import { SignIn } from "@clerk/nextjs";

function Login() {
  return (
    <div className="flex h-91v w-full items-center justify-center">
      <SignIn
        appearance={{
          // layout: {
          //   socialButtonsVariant: "iconButton",
          // },
          elements: {
            cardBox: "rounded-lg shadow-md",
            card: "bg-white dark:bg-cardcolor",
            headerTitle: "dark:text-white",
            headerSubtitle: "dark:text-white/50",
            socialButtonsIconButton: "dark:bg-forminput/10",
            socialButtonsBlockButton: "dark:bg-forminput/10",
            socialButtonsBlockButtonText: "dark:text-gray-100",
            socialButtonsProviderIcon__linkedin_oidc:
              "dark:bg-white dark:rounded-[3px]",
            dividerLine: "dark:bg-white/10",
            dividerText: "dark:text-gray-400",
            formFieldLabel: "dark:text-gray-100",
            formFieldInput:
              "focus:!shadow-none focus:ring-1 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50",
            formFieldInfoText: "dark:text-white/50",
            formButtonPrimary:
              "w-full rounded-lg !shadow-none bg-primary border-none text-sm font-medium text-white hover:bg-cardcolor focus:border focus:border-primary focus:outline-none dark:hover:bg-black/50",

            identityPreviewText: "dark:text-white",
            identityPreviewEditButtonIcon: "dark:text-white/50",
            otpCodeFieldInput: "dark:bg-forminput/10 dark:text-white",
            formResendCodeLink: "dark:text-white/50",
            backLink: "dark:text-white/50",
            footerActionLink: "text-primary",
            // footer: "!bg-white dark:!bg-cardcolor/50",
            // footerAction: "!bg-white dark:!bg-transparent",
            // footerActionText: "dark:text-gray-400",
          },
        }}
      />
    </div>
  );
}

export default Login;
