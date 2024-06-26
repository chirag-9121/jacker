function Login() {
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
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
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

              <div class="flex items-center justify-end">
                <a
                  href="#"
                  class="text-sm font-medium text-primary hover:underline dark:text-primary-light"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cardcolor focus:border focus:border-primary focus:outline-none dark:hover:bg-black/50 dark:focus:border-white"
              >
                Log in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary hover:underline dark:text-primary-light/90"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
