import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mt-8 max-w-3xl w-11/12 md:w-full">
      <h1 className="text-4xl md:text-6xl lg:textxl md:!leading-snug font-semibold text-center bg-clip-text bg-gradient-to-b from-gray-50 to-gray-50 text-transparent">
        Build your next idea and ship your dream site
      </h1>
      <p className="text-base text-gray-300 md:text-lg  mt-6 text-center">
        Zero code, maximum speed. Make professional sites easy, fast and fun
        while delivering best-in-class SEO, performance.
      </p>
      <div className="hidden md:flex relative items-center justify-center mt-8 md:mt-12 w-full">
        <Link
          href="#"
          className="flex items-center justify-center w-max rounded-full border-t border-foreground/30 bg-white/20 backdrop-blur-lg px-2 py-1 md:py-2 gap-2 md:gap-8 shadow-3xl shadow-background/40 cursor-pointer select-none"
        >
          <p className="text-foreground text-sm text-center md:text-base font-medium pl-4 pr-4 lg:pr-0">
            ✨ {"  "} Start building your dream website now!
          </p>
          <Button
            size="sm"
            className="rounded-full hidden lg:flex border border-foreground/20"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
