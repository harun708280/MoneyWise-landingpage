"use client";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Hero from "./Component/Hero";
import DashBoard from "./Component/DashBoard";
import Process from "./Component/Process";
import Feature from "./Component/Feature";
import Priceing from "./Component/Priceing";
import PricingSection from "./Component/Priceing";
import Testimonial from "./Component/Testimonial";
import Launch from "./Component/Launch";
import { LampDemo } from "@/components/ui/lamp";
import Security from "./Component/Security";
import CardPayment from "./Component/CardPayment";
import MoneyVisualizer from "../components/3d/MoneyVisualizer";
import GlassDNA from "../components/3d/MoneyVisualizer";
import MoneyCountingAnimation from "@/components/3d/CountingAnimation";
import News from "@/components/home/News";
import Company from "./Component/Company";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Add smooth scrolling to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href").substring(1);
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
    <section className="w-full mt-16  relative flex items-center justify-center flex-col px-4 md:px-0 py-8 ">
      <div className="absolute bg-gray-950 inset-0 linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10 h-[150vh]" />
      {/* Home Section */}
      <div id="home" className="relative">
        <div className="flex flex-col items-center justify-center pt-14 h-full">
          <button
            className="flex items-center gap-2 px-6 py-2 rounded-full lowercase relative overflow-hidden border border-gray-700 backdrop-blur-md 
  
transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-yellow-500/50"
          >
            <Image
              src={"/sparkles-dark.svg"}
              height={16}
              width={16}
              alt="icon"
            />
            <span className="text-white font-medium uppercase">
              Explore the V-2.0
            </span>
            <ChevronRight className="w-4 h-4 text-white" />

            <BorderBeam
              size={40}
              initialOffset={20}
              className="from-transparent via-yellow-500 to-transparent"
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
              }}
            />
          </button>
        </div>

        <div className="relative  max-w-7xl w-11/12 md:w-full mx-auto">
          <Hero></Hero>
        </div>
        {/* <DashBoard /> */}
      </div>

      {/* Feature Section */}

      <div id="features">
        <Feature />
        <Process />
      </div>
      <div id="security">
        {/* Security section */}
        <CardPayment />
        <Security />
      </div>

      {/* pricing */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* support section */}
      <div id="support">
        <Testimonial />
        <Launch />
      </div>
    </section>
  );
}
