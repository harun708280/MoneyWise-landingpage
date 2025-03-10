"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import { LampContainer } from "@/components/ui/lamp";
import Container from "@/components/global/container";
import { Input } from "@/components/ui/input";

const Launch = () => {
  return (
    <div className=" w-full max-w-7xl">
     
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
            Build stunning websites with Astra&apos;s intuitive drag-and-drop builder and powerful AI assistant
          </p>

          {/* CTA Button */}
          <Button variant="white" className="mt-6 bg-gray-200 text-black" asChild>
            <Link href="/sign-in">
              Get started for free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <Container className="relative z-[999999]">
                    <div className="flex items-center justify-center w-full mt-20">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full px-4 md:px-8 rounded-lg lg:rounded-2xl border border-border/80 py-4 md:py-8">
                            <div className="flex flex-col items-start gap-4 w-full">
                                <h4 className="text-xl md:text-2xl font-semibold">
                                    Join our newsletter
                                </h4>
                                <p className="text-base text-muted-foreground">
                                    Be up to date with everything about AI builder
                                </p>
                            </div>
                            <div className="flex flex-col items-start gap-2 md:min-w-80 mt-5 md:mt-0 w-full md:w-max">
                                <form action="#" className="flex flex-col md:flex-row items-center gap-2 w-full md:max-w-xs">
                                    <Input
                                        required
                                        type="email"
                                        placeholder="Enter your email"
                                        className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-primary duration-300 w-full"
                                    />
                                    <Button type="submit" size="sm" variant="secondary" className="w-full md:w-max">
                                        Subscribe
                                    </Button>
                                </form>
                                <p className="text-xs text-muted-foreground">
                                    By subscribing you agree with our{" "}
                                    <Link href="#">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
     
    </div>
  );
};

export default Launch;
