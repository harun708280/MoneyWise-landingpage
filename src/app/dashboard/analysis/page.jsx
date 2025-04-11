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
import IncomeChart from "./Component/IncomeChart";
import Loading from "../transactions/loading";
import ExpanseChart from "./Component/ExpanseChart";
import SavingChart from "./Component/SavingChart";

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
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left Side: Cards and Expense Chart */}
        <div className="space-y-8 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-indigo-600 text-white">
              <CardHeader>
                <div className="flex gap-6 items-center">
                  <Image
                    src="/empty-wallet.png"
                    height={40}
                    width={40}
                    alt="wallet"
                    className="p-2 border rounded-full border-white/10"
                  />
                  <div className="">
                    <CardTitle className="text-xl">Your Balance</CardTitle>
                  </div>
                </div>
                <div className="border-b-2 border-white/20 pt-4"></div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  ${incomeData?.walletTotal}
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src="/save-2.png"
                    height={40}
                    width={40}
                    alt="wallet"
                    className="border rounded-full border-gray-300 p-2"
                  />
                  <div>
                    <CardTitle className="text-xl">Saving</CardTitle>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pt-4" />
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
            <Card className='mt-7'>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src="/direct-up.png"
                    height={40}
                    width={40}
                    alt="wallet"
                    className="border rounded-full border-gray-300 p-2"
                  />
                  <div>
                    <CardTitle className="text-xl">Expenses</CardTitle>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pt-4" />
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
            <Card className="text-gray-900 mt-7">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src="/direct-down.png"
                    height={40}
                    width={40}
                    alt="wallet"
                    className="border rounded-full border-gray-300 p-2"
                  />
                  <div>
                    <CardTitle className="text-xl">Incomes</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1 text-gray-600" />
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pt-4" />
                
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
          <ExpanseChart ExpenseChartData={incomeData?.ExpenseChartData} />
        </div>
        {/* Right Side: Income and Saving Charts */}
        <div className="space-y-8">
          <IncomeChart
            incomeByCategory={incomeData?.incomeByCategory}
            incomePercentages={incomeData?.incomePercentages}
            IncomeChartData={incomeData?.IncomeChartData}
          />
          <SavingChart savings={incomeData?.savings} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
