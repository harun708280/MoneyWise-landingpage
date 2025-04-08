"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
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
import { ArrowDown, ArrowRight, FileText, Youtube, Music, LayoutList } from "lucide-react";
import Image from "next/image";
import DailyCost from "./component/DailyCost";

const MainDashboard = () => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState(null);
  const [savingPlans, setSavingPlans] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([
    {
      name: "Figma",
      amount: 100,
      date: "August 20, 2022",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      name: "Youtube",
      amount: 120,
      date: "August 20, 2022",
      icon: <Youtube className="h-6 w-6" />,
    },
    {
      name: "Spotify",
      amount: 15,
      date: "August 20, 2022",
      icon: <Music className="h-6 w-6" />,
    },
    {
      name: "Freepik",
      amount: 300,
      date: "August 20, 2022",
      icon: <LayoutList className="h-6 w-6" />,
    },
  ]);
  useEffect(() => {
    if (isLoaded) {
      if (!userId) {
        router.push("/sign-in");
      } else {
        
        setTimeout(() => {
          setOverviewData({
            balance: 28891.138,
            balanceChange: 15,
            saving: 1050.44,
            savingChange: 10,
            expenses: 200.31,
            expensesChange: 2,
            incomes: 21121.0,
            incomesChange: 8,
          });

          setSavingPlans([
            {
              name: "Bali Vacation",
              target: 4000,
              current: 1950.21,
              completion: 48,
              targetDate: "August 25 2022",
            },
            {
              name: "New Gadget",
              target: 1000,
              current: 790.21,
              completion: 79,
              targetDate: "August 25 2022",
            },
            {
              name: "Charity",
              target: 100,
              current: 32.111,
              completion: 32,
              targetDate: "August 25 2022",
            },
          ]);

          setLoading(false);
        }, 2000);
      }
    }
  }, [userId, isLoaded, router]);

  if (loading) {
    return <Loader />;
  }

  

  return (
    <div className="p-4 md:p-8">
      <div className="flex gap-8">
        <div className="max-w-[65%] w-full bg-white p-4 shadow-lg rounded-md">
          <h1 className="text-3xl text-gray-900 font-bold mb-6 ">Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
            {/* Your Balance Card */}
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
                      15% compared with last month
                    </CardDescription>
                  </div>
                </div>
                <div className="border-b-2 border-white/20 pt-4"></div>
              </CardHeader>
              
              <CardContent className="flex items-center justify-between">
                
                <div className="text-2xl font-bold">$28,891.138</div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Saving Card */}
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
                      10% compared with last month
                    </CardDescription>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pt-4"></div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-2xl font-bold">$1,050.44</div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Expenses Card */}
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
                      2% compared with last month
                    </CardDescription>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pt-4"></div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-2xl font-bold">$200.31</div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Incomes Card */}
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
                      8% compared with last month
                    </CardDescription>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pt-4"></div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-2xl font-bold">$21,121.0</div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Saving Plan Section */}
        <div className="grid w-[35%] bg-white grid-cols-1  gap-4 p-4 rounded-md shadow-lg">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 not-last-of-type:font-bold  flex justify-between items-center">
              Saving Plan
              <Button variant="link" className="text-sm text-blue-500">
                See All
              </Button>
            </h2>
            <div className="border-b-2 border-gray-300 py-4"></div>
            {/* Saving Plan Cards */}
            {savingPlans.map((plan, index) => (
              <div key={index} className="mb-4 p-4 text-gray-900 ">
                <div className="">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-sm text-gray-500">
                      Target: {plan.targetDate}
                    </p>
                  </div>
                  
                </div>
                <div className="flex justify-between">
               
                <div className="text-lg font-bold">
                    ${plan.current}
                    <span className="text-[12px] text-gray-500">
                      /${plan.target}
                    </span>
                  </div>
                  <p className="text-sm">{plan.completion}%</p>
                </div>
                <div className="flex justify-between items-center">
                  
                  <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${plan.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-8 mt-20 ">
        <div className="max-w-[65%] w-full ">
        <DailyCost/>
        </div>
        <div className="w-[35%] border p-4 shadow-lg rounded-md">
          {/* Recent Transaction */}
          <h2 className="text-2xl font-bold text-gray-900 flex justify-between items-center">
            Recent Transaction
            <Button variant="link" className="text-sm text-blue-500">
              See All
            </Button>
          </h2>
          <div className="border-b-2 border-gray-300 my-4"></div>
          {recentTransactions.map((transaction, index) => (
            <div key={index} className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gray-200 p-2">
                {transaction.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {transaction.name}
                </h3>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                ${transaction.amount}
              </h3>
              <p className="text-sm text-green-500">Completed</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
