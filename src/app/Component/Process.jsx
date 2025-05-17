"use client";
import Container from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import React, { useRef } from "react";
import { CalendarCheck, ListChecks, TrendingUp } from "lucide-react";

import { useScroll } from "motion/react";

import Card from "./Cadr";

const steps = [
  {
    icon: "2.svg",
    number: "01",
    title: "Sign Up & Set Preferences",
    info: "Start by creating your personal account. Customize your dashboard by setting financial goals, preferred currency, and categories that match your lifestyle to make tracking easier and more personalized.",
  },
  {
    icon: "1.svg",
    number: "02",
    title: "Add Income & Expenses",
    info: "Log all your sources of income and daily expenses with detailed descriptions, dates, and categories. This helps you maintain an accurate financial record and stay aware of your spending habits.",
  },
  {
    icon: "3.svg",
    number: "03",
    title: "Track & Analyze",
    info: "Visualize your financial journey through interactive charts, balance overviews, and expense breakdowns. Identify spending trends, get smart insights, and make informed decisions to reach your financial goals faster.",
  },
];
const Process = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      className="flex flex-col   items-center w-full max-w-7xl justify-center pt-28 relative"
      ref={container}
    >
      <div className="hidden lg:block absolute bottom-0 -left-[25%] bg-blue-500 w-72 h-72 rounded-full z-20 blur-[14rem]"></div>
      <div className="hidden lg:block absolute top-[20%] -right-[25%] bg-blue-500 w-72 h-72 rounded-full z-20 blur-[14rem]"></div>
      <Container>
        <div className="max-w-xl mx-auto text-start md:text-center">
          <SectionBadge title="The Process" />
          <h2 className="text-3xl leading-[50px] lg:text-4xl font-bold mt-6">
          Smarter Steps to Save More


          </h2>
          <p className="text-muted-foreground mt-3">
            Effortlessly manage your income and expenses, set clear financial
            goals, and stay on top of your spending — all in one place.
          </p>
        </div>
      </Container>

      <div className="  w-full relative  mx-auto flex-col  py-10 md:py-20 ">
        {steps.map((perk, i) => {
          const targetScale = 1 - i * 0.05;

          return (
            <Card
              key={i}
              i={i}
              {...perk}
              progress={scrollYProgress}
              range={[i * 0.1, (i + 1) * 0.1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Process;
