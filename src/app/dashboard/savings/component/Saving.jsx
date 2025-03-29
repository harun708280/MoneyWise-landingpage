"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SavingDataChart = ({ targetAmount, currentAmount }) => {
  const percentage = (currentAmount / targetAmount) * 100;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Saving Goal Progress</CardTitle>
        <CardDescription>
          {currentAmount.toLocaleString()} of {targetAmount.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div style={{ width: "250px", margin: "0 auto" }}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage.toFixed(0)}%`}
            styles={buildStyles({
              textColor: "var(--foreground)",
              pathColor: "rgb(59 130 246)",
              trailColor: "var(--muted)",
            })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingDataChart;