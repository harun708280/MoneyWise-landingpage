import Container from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import React from "react";
import { CalendarCheck, ListChecks, TrendingUp } from "lucide-react";

const steps = [
    {
        icon: CalendarCheck,
        title: "Plan Your Tasks",
        info: "Create and organize your tasks with clear priorities and deadlines.",
    },
    {
        icon: ListChecks,
        title: "Track Progress",
        info: "Monitor real-time task updates and collaborate with your team efficiently.",
    },
    {
        icon: TrendingUp,
        title: "Achieve Goals",
        info: "Complete tasks, mark progress, and reach your project milestones smoothly.",
    },
];

const Process = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 relative">
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
      <Container>
      <div className="flex max-w-7xl mx-auto flex-col items-center justify-center py-10 md:py-20 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full divide-x-0 md:divide-x divide-y md:divide-y-0 divide-gray-900 first:border-l-2 lg:first:border-none first:border-gray-900">
                            {steps.map((perk) => (
                                <div key={perk.title} className="flex flex-col items-start px-4 md:px-6 lg:px-8 lg:py-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <perk.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-medium mt-4">
                                        {perk.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-start lg:text-start">
                                        {perk.info}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
      </Container>
    </div>
  );
};

export default Process;
