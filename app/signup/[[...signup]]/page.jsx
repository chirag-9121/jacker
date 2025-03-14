// "use client";

// import { useRouter } from "next/navigation";
// import axios from "axios"; // Used for making requests to server from browser
// import SignupForm from "../SignupForm";
// import { useState } from "react";
// import { useUserContext } from "../../components/UserProvider";

// function Signup() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();
//   const { setUser } = useUserContext();

//   // Signup form submit handler function. Sends the user object to the server for processing.
//   const signupHandler = async (e, user) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post("/api/users/signup", user);
//       if (response.status === 200) {
//         setUser(response.data.savedUser);
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
//     <SignupForm
//       signupHandler={signupHandler}
//       isLoading={isLoading}
//       error={error}
//     />
//   );
// }

// export default Signup;

import { SignUp } from "@clerk/nextjs";

function Signup() {
  return (
    <div className="flex h-91v w-full items-center justify-center">
      <SignUp
        appearance={{
          // layout: {
          //   socialButtonsVariant: "iconButton",
          // },
          elements: {
            cardBox: "rounded-lg shadow-md",
            card: "bg-white dark:bg-cardcolor gap-5 py-5",
            header: "gap-2",
            headerTitle: "dark:text-white",
            headerSubtitle: "dark:text-white/50 hidden",
            socialButtonsIconButton: "dark:bg-forminput/10",
            socialButtonsBlockButton: "dark:bg-forminput/10",
            socialButtonsBlockButtonText: "dark:text-gray-100",
            socialButtonsProviderIcon__linkedin_oidc:
              "dark:bg-white dark:rounded-[3px]",
            main: "gap-3",
            dividerLine: "dark:bg-white/10",
            dividerText: "dark:text-gray-400",
            formFieldLabel: "dark:text-gray-100",
            formFieldInput:
              "focus:!shadow-none focus:ring-1 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50",
            formFieldInputShowPasswordButton:
              "focus:shadow-none focus:border-none focus:outline-none",
            formFieldInputShowPasswordIcon: "dark:fill-white",
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
            // footerActionLink: "dark:text-white/70",
          },
        }}
      />
    </div>
  );
}

export default Signup;
