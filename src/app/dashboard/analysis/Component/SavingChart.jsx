"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { date: "2024-07-15", running: 450, swimming: 300 },
  { date: "2024-07-16", running: 380, swimming: 420 },
  { date: "2024-07-17", running: 520, swimming: 120 },
  { date: "2024-07-18", running: 140, swimming: 550 },
  { date: "2024-07-19", running: 600, swimming: 350 },
  { date: "2024-07-20", running: 480, swimming: 400 },
]

const chartConfig = {
  activities: {
    label: "Activities",
  },
  running: {
    label: "Running",
    color: "hsl(var(--chart-1))",
  },
  swimming: {
    label: "Swimming",
    color: "hsl(var(--chart-2))",
  },
} 

const SavingChart=({savings})=> {
 
  if (!savings || savings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Savings Chart</CardTitle>
          
        </CardHeader>
        <CardContent>
          <p className="text-center">No savings data available.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
      <CardTitle className='text-2xl font-bold'>Savings Chart</CardTitle>
      <CardDescription>
          <div className="flex flex-wrap items-center">
            {savings.map((item) => (
              <div key={item.category} className="flex items-center mr-4 mb-2">
                <div
                  className={`border h-2 w-4 rounded-full bg-blue-500 mr-2`}
                  
                ></div>
                <span>{item.category} <span className="font-bold text-gray-900 ">{item.currentAmount}</span>/ <span className="text-sm">{item.targetAmount}</span> </span>
              </div>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={savings}>
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }}
            />
            <Bar
              dataKey="targetAmount"
              stackId="a"
              fill="#1C7ED0"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="currentAmount"
              stackId="a"
             fill="#FFB300"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent labelKey="category" indicator="line" />
              }
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
export default SavingChart