"use client";

import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Loader from "@/components/global/Loader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowRight,
  FileText,
  Youtube,
  Music,
  LayoutList,
  ShoppingCart,
  Bus,
  Heart,
  Film,
  Book,
  Receipt,
  Repeat,
  TrendingUp,
  Users,
  HelpCircle,
  Briefcase,
  Laptop,
  Activity,
  BarChart,
  Home,
  Percent,
  Gift,
  Award,
  Star,
} from "lucide-react";
import Image from "next/image";
import DailyCost from "./component/DailyCost";
import useUserByEmail from "@/hooks/user";
import { useIncomeByEmailAndTotalQuery } from "@/redux/Api/transaction";
import Loading from "./transactions/loading";
import Link from "next/link";

const categories = {
  expense: [
    { name: "Food", color: "#FF6347", icon: <FileText /> },
    { name: "Shopping", color: "#FFA500", icon: <ShoppingCart /> },
    { name: "Transport", color: "#4682B4", icon: <Bus /> },
    { name: "Health", color: "#32CD32", icon: <Heart /> },
    { name: "Entertainment", color: "#8A2BE2", icon: <Film /> },
    { name: "Education", color: "#FFD700", icon: <Book /> },
    { name: "Bills", color: "#DC143C", icon: <Receipt /> },
    { name: "Subscriptions", color: "#00CED1", icon: <Repeat /> },
    { name: "Investment", color: "#556B2F", icon: <TrendingUp /> },
    { name: "Family", color: "#FF69B4", icon: <Users /> },
    { name: "Others", color: "#808080", icon: <HelpCircle /> },
  ],
  income: [
    { name: "Salary", color: "#32CD32", icon: <Briefcase /> },
    { name: "Freelancing", color: "#4682B4", icon: <Laptop /> },
    { name: "Investments", color: "#FFD700", icon: <Activity /> },
    { name: "Business", color: "#FFA500", icon: <BarChart /> },
    { name: "Rental Income", color: "#8A2BE2", icon: <Home /> },
    { name: "Dividends", color: "#00CED1", icon: <Percent /> },
    { name: "Gifts", color: "#DC143C", icon: <Gift /> },
    { name: "Grants", color: "#556B2F", icon: <Award /> },
    { name: "Bonuses", color: "#FF6347", icon: <Star /> },
    { name: "Family", color: "#FF69B4", icon: <Users /> },
    { name: "Others", color: "#808080", icon: <HelpCircle /> },
  ],
};

const MainDashboard = () => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState(null);
  const [savingPlans, setSavingPlans] = useState([]);

  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || null;
  const { user: userData, isLoading, isError, error } = useUserByEmail(email);
  const { data: incomeData, isLoading: dataLoading } =
    useIncomeByEmailAndTotalQuery(email);

  useEffect(() => {
    if (incomeData && incomeData.savings) {
      setSavingPlans(incomeData.savings.slice(0, 3));
    } else {
      setSavingPlans([]);
    }
  }, [incomeData]);

 

  if (dataLoading && isLoading) {
    return <Loading />;
  }

  if (incomeData) {
    const {
      expenses,
      incomes,
      savings,
      totalExpense,
      totalIncome,
      totalSavings,
      transactions,
      walletTotal,
    } = incomeData;

    
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:max-w-[65%] w-full bg-white p-4 shadow-lg rounded-md">
          <h1 className="text-3xl text-gray-900 font-bold mb-6 ">Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
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
                    <CardDescription className="text-gray-300 flex gap-2 items-center">
                      <span className="bg-green-500/50 p-[1px] rounded-sm text-green-500">
                        <ArrowRight className="-rotate-45 text-sm h-4" />
                      </span>
                      5 % compared with last month
                    </CardDescription>
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
                    <CardDescription className="text-gray-600 mt-1 flex gap-2 items-center">
                      <span className="bg-red-500/50 p-[1px] rounded-sm text-red-500">
                        <ArrowRight className="-rotate-45 text-sm h-4" />
                      </span>
                      3% compared with last month
                    </CardDescription>
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
                    <CardDescription className="text-gray-600 mt-1 flex gap-2 items-center">
                      <span className="bg-yellow-500/50 p-[1px] rounded-sm text-yellow-500">
                        <ArrowRight className="-rotate-45 text-sm h-4" />
                      </span>
                      7% compared with last month
                    </CardDescription>
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
                    <CardDescription className="text-gray-600 mt-1 flex gap-2 items-center">
                      <span className="bg-blue-500/50 p-[1px] rounded-sm text-blue-500">
                        <ArrowRight className="-rotate-45 text-sm h-4" />
                      </span>
                      {overviewData?.incomesChange}% compared with last month
                    </CardDescription>
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
        </div>

        <div className="lg:w-[35%] w-full bg-white p-4 rounded-md shadow-lg">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 not-last-of-type:font-bold flex justify-between items-center">
              Saving Plan
              <Link href="/dashboard/savings">
                <Button variant="link" className="text-sm text-blue-500">
                  See All
                </Button>
              </Link>
            </h2>
            <div className="border-b-2 border-gray-300 py-4"></div>
            {savingPlans && savingPlans.length > 0 ? (
              savingPlans.map((plan, index) => {
                const targetDate = plan?.endDate
                  ? new Date(plan.endDate).toLocaleDateString()
                  : "N/A";

                return (
                  <div key={index} className="mb-4 p-4 text-gray-900 ">
                    <div className="">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{plan?.category}</h3>
                        <p className="text-sm text-gray-500">
                          Target: {targetDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-lg font-bold">
                        ${plan?.currentAmount}
                        <span className="text-[12px] text-gray-500">
                          /${plan?.targetAmount}
                        </span>
                      </div>
                      <p className="text-sm">
                        {plan?.targetAmount > 0
                          ? (
                              (plan?.currentAmount / plan?.targetAmount) *
                              100
                            ).toFixed(2)
                          : 0}
                        %
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className={`h-2.5 rounded-full ${
                            plan?.category === "Emergency Fund"
                              ? "bg-green-500"
                              : plan?.category === "Home/Car"
                              ? "bg-purple-500"
                              : plan?.category === "Education"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                          style={{
                            width:
                              plan?.targetAmount > 0
                                ? `${(
                                    (plan?.currentAmount / plan?.targetAmount) *
                                    100
                                  ).toFixed(2)}%`
                                : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center">
                No saving plans available.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mt-20">
        <div className="lg:max-w-[65%] w-full">
          <DailyCost
            incomes={incomeData?.incomes}
            expenses={incomeData?.expenses}
          />
        </div>
        <div className="lg:w-[35%] w-full border p-4 shadow-lg rounded-md">
          <h2 className="text-2xl font-bold text-gray-900 flex justify-between items-center">
            Recent Transaction
            
            <Link href='/dashboard/transactions'>
            <Button variant="link" className="text-sm text-blue-500">
              See All
            </Button>
            </Link>

          </h2>
          <div className="border-b-2 border-gray-300 my-4"></div>
          {incomeData?.transactions && incomeData.transactions.length > 0 ? (
            incomeData.transactions.slice(0, 4).map((transaction, index) => {
              const categoryType =
                transaction.type === "expense" ? "expense" : "income";
              const categoryInfo = categories[categoryType]?.find(
                (cat) => cat.name === transaction.category
              );

              return (
                <div
                  key={index}
                  className="flex justify-between items-center mb-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-gray-200 p-2">
                      {categoryInfo?.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {transaction?.category}
                        <span
                          className={`text-sm ml-2 mb-1 px-1 rounded-full pb-1 text-white font-medium ${
                            transaction.type === "income"
                              ? "bg-amber-400"
                              : "bg-red-500 "
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction?.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      ${transaction?.amount}
                    </h3>
                    <p className="text-sm text-green-500">Complete</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">
              No recent transactions available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
