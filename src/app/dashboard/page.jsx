"use client";

import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
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
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || null;
  const { user: userData, isLoading: userLoading } = useUserByEmail(email);
  const { data: incomeData, isLoading: incomeLoading } =
    useIncomeByEmailAndTotalQuery(email);

  const [savingPlans, setSavingPlans] = useState([]);

  useEffect(() => {
    if (incomeData?.savings) {
      setSavingPlans(incomeData.savings.slice(0, 3));
    }
  }, [incomeData]);

  if (incomeLoading || userLoading) return <Loading />;

  const incomeChange = incomeData?.incomes?.length >= 2
    ? (
        ((incomeData.incomes?.[incomeData.incomes.length - 1]?.amount -
          incomeData.incomes?.[incomeData.incomes.length - 2]?.amount) /
          incomeData.incomes?.[incomeData.incomes.length - 2]?.amount) *
        100
      ).toFixed(2)
    : "0";

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Overview Section */}
        <div className="lg:max-w-[65%] w-full bg-white p-4 shadow-lg rounded-md">
          <h1 className="text-3xl text-gray-900 font-bold mb-6">Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Balance */}
            <Card className="bg-blue-900 text-white">
              <CardHeader>
                <div className="flex gap-6 items-center">
                  <Image src="/empty-wallet.png" width={40} height={40} alt="wallet" className="p-2 border rounded-full border-white/10" />
                  <div>
                    <CardTitle className="text-xl">Your Balance</CardTitle>
                    <CardDescription className="text-gray-300 flex gap-2 items-center">
                      <span className="bg-green-500/50 p-[1px] rounded-sm text-green-500">
                        <ArrowRight className="-rotate-45 h-4" />
                      </span>
                      5% compared with last month
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-2xl font-bold">${incomeData?.walletTotal || 0}</div>
                <Link href="/dashboard/accounts">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Saving */}
            <Card>
              <CardHeader>
                <div className="flex gap-6 items-center">
                  <Image src="/save-2.png" width={40} height={40} alt="save" className="p-2 border rounded-full" />
                  <div>
                    <CardTitle className="text-xl">Saving</CardTitle>
                    <CardDescription className="text-gray-600 flex gap-2 items-center">
                      <span className="bg-red-500/50 p-[1px] rounded-sm text-red-500">
                        <ArrowRight className="-rotate-45 h-4" />
                      </span>
                      3% compared with last month
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-2xl font-bold">${incomeData?.totalSavings || 0}</div>
                <Link href="/dashboard/savings">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Expenses */}
            <Card>
              <CardHeader>
                <div className="flex gap-6 items-center">
                  <Image src="/direct-up.png" width={40} height={40} alt="expense" className="p-2 border rounded-full" />
                  <div>
                    <CardTitle className="text-xl">Expenses</CardTitle>
                    <CardDescription className="text-gray-600 flex gap-2 items-center">
                      <span className="bg-yellow-500/50 p-[1px] rounded-sm text-yellow-500">
                        <ArrowRight className="-rotate-45 h-4" />
                      </span>
                      7% compared with last month
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-2xl font-bold">${incomeData?.totalExpense || 0}</div>
                <Link href="/dashboard/transactions">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Incomes */}
            <Card>
              <CardHeader>
                <div className="flex gap-6 items-center">
                  <Image src="/direct-down.png" width={40} height={40} alt="income" className="p-2 border rounded-full" />
                  <div>
                    <CardTitle className="text-xl">Incomes</CardTitle>
                    <CardDescription className="text-gray-600 flex gap-2 items-center">
                      <span className="bg-blue-500/50 p-[1px] rounded-sm text-blue-500">
                        <ArrowRight className="-rotate-45 h-4" />
                      </span>
                      {incomeChange}% compared with last month
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-2xl font-bold">${incomeData?.totalIncome || 0}</div>
                 <Link href="/dashboard/accounts">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Saving Plan Section */}
        <div className="lg:w-[35%] w-full bg-white p-4 shadow-lg rounded-md">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex justify-between items-center">
              Saving Plan
              <Link href="/dashboard/savings">
                <Button variant="link" className="text-sm text-blue-500">See All</Button>
              </Link>
            </h2>
            <div className="border-b-2 border-gray-300 py-4"></div>
            {savingPlans.length > 0 ? (
              savingPlans.map((plan, index) => {
                const progress = plan?.targetAmount > 0
                  ? (plan.currentAmount / plan.targetAmount) * 100
                  : 0;
                return (
                  <div key={index} className="mb-4 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{plan?.category}</h3>
                      <p className="text-sm text-gray-500">
                        Target: {new Date(plan?.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-lg font-bold">
                        ${plan?.currentAmount}
                        <span className="text-sm text-gray-500">
                          /${plan?.targetAmount}
                        </span>
                      </div>
                      <p className="text-sm">{progress.toFixed(2)}%</p>
                    </div>
                    <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full bg-blue-500"
                        style={{ width: `${progress.toFixed(2)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center">No saving plans available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row gap-8 mt-20">
        <div className="lg:max-w-[65%] w-full">
          <DailyCost
            incomes={incomeData?.incomes}
            expenses={incomeData?.expenses}
          />
        </div>
        <div className="lg:w-[35%] w-full border p-4 shadow-lg rounded-md">
          <h2 className="text-2xl font-bold text-gray-900 flex justify-between items-center">
            Recent Transactions
            <Link href="/dashboard/transactions">
              <Button variant="link" className="text-sm text-blue-500">See All</Button>
            </Link>
          </h2>
          <div className="border-b-2 border-gray-300 my-4"></div>
          {incomeData?.transactions?.slice(0, 4).map((txn, index) => {
            const category = categories[txn.type]?.find(c => c.name === txn.category);
            return (
              <div key={index} className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-gray-200">{category?.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {txn.category}
                      <span className={`ml-2 text-sm px-2 rounded-full text-white ${
                        txn.type === "income" ? "bg-green-500" : "bg-red-500"
                      }`}>{txn.type}</span>
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(txn.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">
                  ${txn.amount}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
