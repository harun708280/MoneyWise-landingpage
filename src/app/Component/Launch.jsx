"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import { LampContainer } from "@/components/ui/lamp";
import Container from "@/components/global/container";
import { Input } from "@/components/ui/input";
import CTA from "@/components/home/CTA";
import CommonButton from "@/components/ui/CommonButton";

const Launch = () => {
  return (
    <div className="pt-24  w-full max-w-[1050px] mx-auto ">
      <CTA>
        <div className="flex flex-col items-center justify-center relative w-full text-center">
          {/* Animated Heading */}
          <motion.h2
            className="text-4xl lg:text-5xl xl:text-6xl lg:!leading-snug font-semibold mt-8"
            initial={{ backgroundPosition: "100% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          >
            From Idea to Launch <br /> Faster Than Ever
          </motion.h2>

          {/* Subtitle */}
          <p className="text-muted-foreground mt-6 max-w-md mx-auto">
            Build stunning websites with Astra&apos;s intuitive drag-and-drop
            builder and powerful AI assistant
          </p>

          {/* CTA Button */}
          <Button
            variant="white"
            className="mt-6 bg-gray-200 text-black"
            asChild
          >
            
          </Button>
          <Link href="/sign-in" className="mt-5">
          <CommonButton isReversed>
              <div className="flex items-center gap-2">
                
             
              Get started for free
              <ArrowRight className="w-4 h-4 ml-2" />
            
              </div>
            </CommonButton>
            </Link>
        </div>

      
      </CTA>
    </div>
  );
};

export default Launch;
