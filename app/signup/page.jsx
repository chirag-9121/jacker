// import Link from "next/link";
// import Image from "next/image";
// import Logo from "./../../public/jacker-logo.png";

function Signup() {
  return (
    <section className="h-91v">
      <div className="mx-auto flex h-full flex-col items-center justify-center px-6 py-8 lg:py-0">
        {/* <Link href="/">
          <Image
            className="mb-6 mr-2 rounded-md"
            src={Logo}
            alt="logo"
            height={50}
            placeholder="blur"
            quality={100}
          />
        </Link> */}
        <div className="w-full rounded-lg bg-white shadow-md sm:max-w-md md:mt-0 xl:p-0 dark:bg-cardcolor">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="flex justify-between">
                <div>
                  <label
                    for="first-name"
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="fname"
                    className="bg-forminput dark:bg-forminput/10 block w-full rounded-lg border-2 border-transparent p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                    placeholder="John"
                    required=""
                  />
                </div>

                <div>
                  <label
                    for="last-name"
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="lname"
                    className="bg-forminput dark:bg-forminput/10 block w-full rounded-lg border-2 border-transparent p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                    placeholder="Doe"
                    required=""
                  />
                </div>
              </div>
              <div>
                <label
                  for="email"
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-forminput dark:bg-forminput/10 block w-full rounded-lg border-2 border-transparent p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                  placeholder="johndoe@gmail.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-forminput dark:bg-forminput/10 block w-full rounded-lg border-2 border-transparent p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                  required=""
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-forminput dark:bg-forminput/10 block w-full rounded-lg border-2 border-transparent p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cardcolor focus:border focus:border-primary focus:outline-none dark:hover:bg-black/50 dark:focus:border-white"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary hover:underline dark:text-primary-light/90"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
