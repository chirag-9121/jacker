"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "./../../public/jacker-logo.png";

function Navbar() {
  return (
    <nav className="flex h-9v justify-between bg-primary px-24 py-1.5">
      <Link href="/">
        <Image
          src={Logo}
          alt="Jacker Logo"
          height={50}
          placeholder="blur"
          quality={100}
        />
      </Link>

      <div className="flex items-center justify-end gap-5">
        <Link href="/signup">
          <button class="h-9 w-20 rounded-lg border border-primary-light text-sm font-semibold text-white hover:bg-primary-light hover:text-primary">
            Sign Up
          </button>
        </Link>
        <Link href="/login">
          <button class="h-9 w-20 rounded-lg bg-primary-light text-sm font-semibold text-primary hover:shadow-md hover:shadow-black/30">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
