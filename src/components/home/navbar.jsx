import React, { useEffect } from "react";
import Container from "../global/container";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CommonButton from "../ui/CommonButton";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1); // Remove '#'
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }, []);
  return (
    <div>
      <header className="px-4 py-4 h-16 mb-20 overflow-hidden  fixed top-0 inset-x-0 w-full  backdrop-blur-lg border-b border-gray-500 z-50">
        <Container reverse>
          <div className="flex items-center justify-between h-full mx-auto md:max-w-screen-xl">
            <div className="flex items-start">
              <a href="#home" className="flex items-center gap-2">
                <div className="w-8 h-8">
                  <Image
                    src={"/icon.png"}
                    height={32}
                    width={32}
                    alt="logo"
                  ></Image>
                </div>
                <span className="text-lg font-medium">Money Wise</span>
              </a>
            </div>
            <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ul className="flex items-center justify-center gap-8">
                <li>
                  <a
                    href="#home" // Added ID
                    className="hover:text-foreground/80 text-sm font-semibold"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features" // Added ID
                    className="hover:text-foreground/80 text-sm font-semibold"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing" // Added ID
                    className="hover:text-foreground/80 text-sm font-semibold"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#security" // Added ID
                    className="hover:text-foreground/80 text-sm font-semibold"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#support" // Added ID
                    className="hover:text-foreground/80 text-sm font-semibold"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <Link href="/dashboard">
                  <CommonButton isReversed>
                    <span className="font-bold">Start Free Trial</span>
                  </CommonButton>
                </Link>
              ) : (
                <Link href="/sign-in" className="cursor-pointer">
                  <CommonButton isReversed>
                    <span className="font-bold"> Sign In</span>
                  </CommonButton>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
};

export default Navbar;
