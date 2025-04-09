"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { useChartDataAnalystQuery } from "@/redux/Api/transaction";

const DailyCost = () => {
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || null;
  const { data } = useChartDataAnalystQuery(email);

  const chartConfig = {
    income: {
      label: "income",
      color: "#7559e8",
    },
    expense: {
      label: "expense",
      color: "#f59e0b",
    },
  };

  // তারিখের ফিল্টারিং সরিয়ে দেওয়া হলো
  const filteredData = data;

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString.split("-").reverse().join("-"));
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const getMaxDataValue = (data) => {
    let max = 0;
    data?.forEach((item) => {
      max = Math.max(max, item.income, item.expense);
    });
    return max;
  };

  const maxDataValue = getMaxDataValue(filteredData);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className='text-2xl font-bold text-gray-900'>Analytics</CardTitle>
          <CardDescription>Showing all transactions</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
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
                  return `${value}`;
                }
                return value;
              }}
              domain={[0, maxDataValue]}
            />
            <Tooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value.split("-").reverse().join("-")).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="income" type="natural" stroke={chartConfig.income.color} fill={chartConfig.income.color} fillOpacity={0.3} />
            <Area dataKey="expense" type="natural" stroke={chartConfig.expense.color} fill={chartConfig.expense.color} fillOpacity={0.3} />
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