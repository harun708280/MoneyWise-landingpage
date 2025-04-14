"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

const ExpanseChart = ({ ExpenseChartData }) => {
 

 
  if (!ExpenseChartData || ExpenseChartData.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle >
            Expanse by Category
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="text-center text-gray-500 py-8">
          No expense data available.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Expanse by Category
        </CardTitle>
        <CardDescription>
          <div className="flex flex-wrap items-center">
            {ExpenseChartData.map((item) => (
              <div key={item.name} className="flex items-center mr-4 mb-2">
                <div
                  className={`border h-2 w-4 rounded-full mr-2`}
                  style={{ backgroundColor: item.fill }}
                ></div>
                <span>
                  {item.browser} {item.amount}
                </span>
              </div>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[450px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={ExpenseChartData}
              dataKey="visitors"
              label={({ name, visitors }) => `(${parseInt(visitors)})%`}
              nameKey="browser"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExpanseChart;