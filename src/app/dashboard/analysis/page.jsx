"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUserByEmail from "@/hooks/user";
import { useIncomeByEmailAndTotalQuery } from "@/redux/Api/transaction";
import { useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import IncomeExpense from "../component/IncomeExpense";
import IncomeChart from "./Component/IncomeChart";
import Loading from "../transactions/loading";
import ExpanseChart from "./Component/ExpanseChart";

const Analysis = () => {
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || null;
  const { user: userData, isLoading, isError, error } = useUserByEmail(email);
  const { data: incomeData, isLoading: dataLoading } =
    useIncomeByEmailAndTotalQuery(email);

  if (!incomeData) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex  gap-8">
        <div className="w-1/2 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card className="">
              <CardHeader>
                <div className="flex gap-6 items-center">
                  <Image
                    src="/save-2.png"
                    height={40}
                    width={40}
                    alt="wallet"
                    className="p-2 border rounded-full border-gray-300"
                  />
                  <div className="">
                    <CardTitle className="text-xl">Saving</CardTitle>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pt-4"></div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  ${incomeData?.totalSavings || 0}
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader>
                <div className="flex gap-6 items-center">
                  <Image
                    src="/direct-up.png"
                    height={40}
                    width={40}
                    alt="wallet"
                    className="p-2 border rounded-full border-gray-300"
                  />
                  <div className="">
                    <CardTitle className="text-xl">Expenses</CardTitle>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pt-4"></div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  ${incomeData?.totalExpense}
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="text-gray-900">
              <CardHeader>
                <div className="flex gap-6 items-center">
                  <Image
                    src="/direct-down.png"
                    height={40}
                    width={40}
                    alt="wallet"
                    className="p-2 border rounded-full border-gray-300"
                  />
                  <div className="">
                    <CardTitle className="text-xl">Incomes</CardTitle>
                    <CardDescription className="text-gray-600 mt-1 flex gap-2 items-center"></CardDescription>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pt-4"></div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  ${incomeData?.totalIncome}
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="my-12 border">
            <ExpanseChart ExpenseChartData={incomeData?.ExpenseChartData}/>

          </div>
        </div>
        <div className="w-1/2 ">
          <IncomeChart
            incomeByCategory={incomeData?.incomeByCategory}
            incomePercentages={incomeData?.incomePercentages}
            IncomeChartData={incomeData?.IncomeChartData}
          />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
