"use client";
import Container from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import React, { useRef } from "react";
import { CalendarCheck, ListChecks, TrendingUp } from "lucide-react";

import { useScroll } from "motion/react";

import Card from "./Cadr";

const steps = [
  {
    icon: '1.svg',
    number: '01',
    title: 'Plan Your Tasks',
    info: 'Create and organize your tasks with clear priorities and deadlines.',
  },
  {
    icon: '2.svg',
    number: '02',
    title: 'Track Progress',
    info: 'Monitor real-time task updates and collaborate with your team efficiently.',
  },
  {
    icon: '3.svg',
    number: '03',
    title: 'Achieve Goals',
    info: 'Complete tasks, mark progress, and reach your project milestones smoothly.',
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
      className="flex flex-col items-center w-full max-w-7xl justify-center py-12 relative"
      ref={container}
    >
      <Container>
        <div className="max-w-xl mx-auto text-start md:text-center">
          <SectionBadge title="The Process" />
          <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
            Three Simple Steps to Manage Your Tasks Efficiently
          </h2>
          <p className="text-muted-foreground mt-6">
            Organize, collaborate, and track your tasks with ease.
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
