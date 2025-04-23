import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import CommonButton from "@/components/ui/CommonButton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="   w-full pb-12">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white md:leading-tight">
            Simplify Your Financial Management
          </h1>
          <p className="text-lg text-gray-600 mt-4 md:mt-6">
            Take control of your financial future with our intuitive platform. Easily manage your money, track expenses, and achieve your financial goals.
          </p>
          <div className="mt-8 md:mt-12">
          <Link href="/dashboard">
                  <CommonButton isReversed>
                    <span className="font-bold"> Go to Dashboard</span>
                  </CommonButton>
                </Link>
          </div>
        </div>
        <div className="md:w-1/2  relative">
          <Image
            src="/Crypto-Exchange-Solutions-1-svartech.png"
            alt="Financial Management Illustration"
            width={800}
            height={700}
            className=""
            priority // Good practice for hero images
          />
          <div className="absolute top-1/2 left-1/2 -z-10 w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 blur-[10rem] gradient opacity-50"></div>
          
        </div>
      </Container>
    </div>
  );
};

export default Hero;