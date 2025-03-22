import React from "react";
import Container from "../global/container";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  return (
    <div>
      <header className="px-4 h-14 sticky top-0 inset-x-0 w-full  backdrop-blur-lg border-b border-gray-500 z-50">
        <Container reverse>
          <div className="flex items-center justify-between h-full mx-auto md:max-w-screen-xl">
            <div className="flex items-start">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8">
                  <Image
                    src={"/icon.png"}
                    height={32}
                    width={32}
                    alt="logo"
                  ></Image>
                </div>
                <span className="text-lg font-medium">Money Wise</span>
              </Link>
            </div>
            <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ul className="flex items-center justify-center gap-8">
                <Link href="#" className="hover:text-foreground/80 text-sm">
                  Pricing
                </Link>
                <Link href="#" className="hover:text-foreground/80 text-sm">
                  About
                </Link>
                <Link href="#" className="hover:text-foreground/80 text-sm">
                  Features
                </Link>
                <Link href="#" className="hover:text-foreground/80 text-sm">
                  Blog
                </Link>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              {/* <Link
                href="/sign-in"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Login
              </Link> */}
              {
                isSignedIn ?<Link
                href="/dashboard"
                className="bg-gradient-to-r  from-blue-900 to-blue-500 px-3 py-1 rounded-lg font-semibold"
              >
                Start free trial
              </Link>:<Link href="/sign-in" className="bg-gradient-to-r  from-blue-900 to-blue-500 px-4 py-1 rounded-md">
                  Sign In
                </Link>
              }
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
};

export default Navbar;
