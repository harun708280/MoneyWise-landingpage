"use client";
import React from "react";
import UserSavingsForm from "./component/SavingForm";
import {
  BriefcaseIcon,
  PlaneIcon,
  SchoolIcon,
  HomeIcon,
  PackageIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "lucide-react";
import Link from "next/link";

const Savings = () => {
    const savingsData = [
        {
          id: 1,
          category: "Emergency Fund",
          targetAmount: 50000,
          currentAmount: 25000,
          reason: "For unexpected expenses",
          startDate: "2023-01-15",
          endDate: "2023-12-31",
          recurring: "monthly",
          initialDeposit: 10000,
          interestRate: "0.05",
          accountName: "Emergency Savings",
          savingsFrequency: "monthly",
          savingsDescription: "Regular monthly contributions.",
        },
        {
          id: 2,
          category: "Travel",
          targetAmount: 100000,
          currentAmount: 15000,
          reason: "Trip to Europe",
          startDate: "2024-03-01",
          endDate: "2025-06-30",
          recurring: "weekly",
          initialDeposit: 5000,
          interestRate: "0.02",
          accountName: "Travel Fund",
          savingsFrequency: "weekly",
          savingsDescription: "Saving for a dream vacation.",
        },
        {
          id: 3,
          category: "Education",
          targetAmount: 200000,
          currentAmount: 75000,
          reason: "For higher studies",
          startDate: "2022-09-10",
          endDate: "2026-08-31",
          recurring: "monthly",
          initialDeposit: 20000,
          interestRate: "0.03",
          accountName: "Education Fund",
          savingsFrequency: "monthly",
          savingsDescription: "Long-term education savings.",
        },
        {
          id: 4,
          category: "Home/Car",
          targetAmount: 500000,
          currentAmount: 100000,
          reason: "Down payment for a new car",
          startDate: "2024-07-01",
          endDate: "2027-12-31",
          recurring: "no",
          accountName: "Car Savings",
          savingsFrequency: "once",
         
        },
        {
          id: 5,
          category: "Others",
          targetAmount: 25000,
          currentAmount: 10000,
          reason: "New gadget purchase",
          startDate: "2025-01-15",
          endDate: "2025-06-30",
          recurring: "weekly",
          initialDeposit: 2000,
          interestRate: "0.005",
          accountName: "Gadget Fund",
          savingsFrequency: "weekly",
          savingsDescription: "Saving for a new phone.",
        },
      ];

  const getCategoryDetails = (category) => {
    switch (category) {
      case "Emergency Fund":
        return {
          icon: <BriefcaseIcon className="h-10 w-10 text-blue-500" />,
          bgColor: "bg-blue-100",
          bgHover: "hover:shadow-blue-500", 
        };
      case "Travel":
        return {
          icon: <PlaneIcon className="h-10 w-10 text-green-500" />,
          bgColor: "bg-green-100",
          bgHover: "hover:shadow-green-500", 
        };
      case "Education":
        return {
          icon: <SchoolIcon className="h-10 w-10 text-yellow-500" />,
          bgColor: "bg-yellow-100",
          bgHover: "hover:shadow-yellow-500", 
        };
      case "Home/Car":
        return {
          icon: <HomeIcon className="h-10 w-10 text-purple-500" />,
          bgColor: "bg-purple-200",
          bgHover: "hover:shadow-purple-500", 
        };
      default:
        return {
          icon: <PackageIcon className="h-10 w-10 text-pink-500" />,
          bgColor: "bg-pink-100",
          bgHover: "hover:shadow-pink-500", 
        };
    }
  };

  const visibleSavingsData = savingsData.slice();

  return (
    <div className="text-gray-800 p-6 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-[70%] bg-white p-3 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Your Savings Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleSavingsData.map((item) => {
            const { icon, bgColor, bgHover } = getCategoryDetails(item.category);
            return (
              <Link href={`/dashboard/savings:${item.id}`} key={item.id}>
                <div
                  className={`p-4 rounded-md relative shadow-xl transition duration-300 hover:shadow-lg ${bgHover} ${bgColor}`}
                >
                  <div className="">
                    <div className="">
                      <div className="flex items-center flex-col mb-2">
                        {icon}
                        <span className="ml-2 text-xl font-bold">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4">
                      <p className="text-sm text-gray-700 mb-1">
                        <span className="font-bold">Target:</span>{" "}
                        {item.targetAmount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-700 ">
                        <span className="font-bold">Recurring Savings:</span>{" "}
                        {item.recurring}
                      </p>
                      <p className="text-sm text-gray-700 ">
                        <span className="font-bold">Current:</span>{" "}
                        {item.currentAmount
                          ? item.currentAmount.toLocaleString()
                          : "0"}
                      </p>
                      <p className="text-sm text-gray-700 ">
                        <span className="font-bold">End Date:</span>{" "}
                        {new Date(item.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-700 ">
                        <span className="font-bold">Start Date:</span>{" "}
                        {new Date(item.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-[30%]">
        <UserSavingsForm />
      </div>
    </div>
  );
};

export default Savings;