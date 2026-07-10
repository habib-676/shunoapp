"use client";

import { cn } from "@/lib/utils";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
];

function Navbar() {
  const pathName = usePathname();
  const { user } = useUser();
  return (
    <header className="w-full fixed  z-50 bg-('--bg-primary')">
      <div className="wrapper navbar-height py-4 flex justify-between items-center ">
        <Link href="/" className="flex gap-0.5 items-center ">
          <Image
            src={"/assets/logo.png"}
            alt="ShunoApp Logo"
            width={42}
            height={26}
          />
          <span className="logo-text">ShunoBook</span>
        </Link>

        <nav className="w-fit flex gap-7.5 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName.startsWith(href));
            return (
              <Link
                href={href}
                key={label}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70",
                )}
              >
                {label}
              </Link>
            );
          })}

          <div className="flex gap-7.5 items-center">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <div className="nav-user-link">
              <Show when="signed-in">
                <UserButton />
                {user?.firstName && (
                  <Link href="/subscription" className="nav-user-name">
                    {user.firstName}
                  </Link>
                )}
              </Show>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
