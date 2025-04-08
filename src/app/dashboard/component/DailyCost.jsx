"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-01", label1: 13000, label2: 5500 },
  { date: "2024-04-02", label1: 11500, label2: 7000 },
  { date: "2024-04-03", label1: 12000, label2: 6000 },
  { date: "2024-04-04", label1: 14000, label2: 8000 },
  { date: "2024-04-05", label1: 15000, label2: 10000 },
  { date: "2024-04-06", label1: 18000, label2: 11000 },
  { date: "2024-04-07", label1: 16000, label2: 9000 },
  { date: "2024-04-08", label1: 20000, label2: 12000 },
  { date: "2024-04-09", label1: 10000, label2: 6500 },
  { date: "2024-04-10", label1: 13000, label2: 7500 },
  { date: "2024-04-11", label1: 15000, label2: 9500 },
  { date: "2024-04-12", label1: 14000, label2: 8500 },
  { date: "2024-04-13", label1: 17000, label2: 11500 },
  { date: "2024-04-14", label1: 12000, label2: 7000 },
  { date: "2024-04-15", label1: 11000, label2: 6500 },
  { date: "2024-04-16", label1: 12500, label2: 7500 },
  { date: "2024-04-17", label1: 19000, label2: 12500 },
  { date: "2024-04-18", label1: 18500, label2: 13000 },
  { date: "2024-04-19", label1: 16500, label2: 9500 },
  { date: "2024-04-20", label1: 10500, label2: 6000 },
  { date: "2024-04-21", label1: 12500, label2: 7500 },
  { date: "2024-04-22", label1: 13500, label2: 8000 },
  { date: "2024-04-23", label1: 14500, label2: 8500 },
  { date: "2024-04-24", label1: 17500, label2: 10000 },
  { date: "2024-04-25", label1: 16000, label2: 9000 },
  { date: "2024-06-21", label1: 13000, label2: 8000 },
  { date: "2024-06-22", label1: 16000, label2: 10500 },
  { date: "2024-06-23", label1: 20000, label2: 13000 },
  { date: "2024-06-24", label1: 12000, label2: 7500 },
  { date: "2024-06-25", label1: 12500, label2: 8000 },
  { date: "2024-06-26", label1: 18000, label2: 12000 },
  { date: "2024-06-27", label1: 19000, label2: 13500 },
  { date: "2024-06-28", label1: 13000, label2: 8500 },
  { date: "2024-06-29", label1: 11000, label2: 7000 },
  { date: "2024-06-30", label1: 18500, label2: 12500 },
];

const chartConfig = {
  label1: {
    label: "Label 1",
    color: "#7559e8",
  },
  label2: {
    label: "Label 2",
    color: "#f59e0b",
  },
};

const DailyCost = () => {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ["Ok", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Analytics</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Weekly" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return getDayOfWeek(value);
              }}
            />
            <YAxis
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `${value / 1000}k`;
                }
                return value;
              }}
              domain={[1000, "dataMax"]}
            />
            <Tooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="label1"
              type="natural"
              stroke={chartConfig.label1.color}
              fill={chartConfig.label1.color}
              fillOpacity={0.3}
            />
            <Area
              dataKey="label2"
              type="natural"
              stroke={chartConfig.label2.color}
              fill={chartConfig.label2.color}
              fillOpacity={0.3}
            />
            <Legend content={<LegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const LegendContent = (props) => {
  const { payload } = props;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {payload.map((item, index) => (
        <div key={`item-${index}`} style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: item.color,
              marginRight: "5px",
            }}
          ></span>
          <span style={{ fontSize: "0.8rem" }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default DailyCost;