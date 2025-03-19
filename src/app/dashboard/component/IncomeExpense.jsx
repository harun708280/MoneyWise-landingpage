"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

// ✅ `useState`-এ `chartConfig`-এর ডিফল্ট মান দিন
const IncomeExpense = () => {
  const [chartConfig, setChartConfig] = useState(null); // ✅ প্রথমে `null` সেট করুন

  useEffect(() => {
    if (typeof window !== "undefined") {
      setChartConfig({
        desktop: {
          label: "Desktop",
          color: getComputedStyle(document.documentElement).getPropertyValue("--chart-1") || "#ff9800",
        },
        mobile: {
          label: "Mobile",
          color: getComputedStyle(document.documentElement).getPropertyValue("--chart-2") || "#03a9f4",
        },
      });
    }
  }, []);

  // ✅ `chartConfig` লোড হওয়ার আগ পর্যন্ত লোডিং দেখানো হবে
  if (!chartConfig || Object.keys(chartConfig).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        {/* ✅ `chartConfig` লোড হওয়ার আগ পর্যন্ত `ChartContainer` রেন্ডার হবে না */}
        {chartConfig && Object.keys(chartConfig).length > 0 && (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              {/* ✅ `fill` সরাসরি `chartConfig` থেকে পাস করা হয়েছে */}
              <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
              <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default IncomeExpense;
