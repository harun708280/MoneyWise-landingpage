"use client";
import React, { useState } from "react";
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
import { useUser } from "@clerk/nextjs";
import { useGetUserSavingsByEmailQuery } from "@/redux/Api/savingApi";
import Loader from "@/components/global/Loader";
import Image from "next/image";

const Savings = () => {
  const { user, isSignedIn } = useUser();
  const [isOpen, setIsOpen]=useState(false)

  const userEmail = user?.emailAddresses?.[0]?.emailAddress || null;
  const {
    data: savingData,
    isFetching,
    isLoading,
  } = useGetUserSavingsByEmailQuery(userEmail);
  if (!user && isSignedIn && isFetching && isLoading) {
    return <Loader />;
  }
  console.log(savingData);

  const getCategoryDetails = (category) => {
    switch (category) {
      case "Emergency Fund":
        return {
          icon: <BriefcaseIcon className="h-10 w-10 text-blue-500" />,
          bgColor: "bg-blue-200",
          bgHover: "hover:shadow-blue-500",
        };
      case "Travel":
        return {
          icon: <PlaneIcon className="h-10 w-10 text-green-500" />,
          bgColor: "bg-green-200",
          bgHover: "hover:shadow-green-500",
        };
      case "Education":
        return {
          icon: <SchoolIcon className="h-10 w-10 text-yellow-500" />,
          bgColor: "bg-yellow-200",
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
          bgColor: "bg-pink-200",
          bgHover: "hover:shadow-pink-500",
        };
    }
  };

  return (
    <div className="">
      <div className="relative h-[300px] w-full overflow-hidden rounded-md mb-6">
        <Image
          src="/savingBanner.jpg"
          alt="save"
          fill
          className="object-center opacity-60 rounded-md"
        />
        <div className="bg-black opacity-40 absolute inset-0 rounded-md"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"></h2>
          <button onClick={()=>setIsOpen(true)} className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-900 to-blue-500 rounded-md hover:bg-sky-600 transition-colors duration-300">
            <span className="absolute inset-0 rounded-md animate-ping bg-gradient-to-r from-blue-900 to-blue-500 opacity-75"></span>
            <span className="relative text-sm font-medium">
              Add Savings Goal
            </span>
          </button>
        </div>
      </div>
      <div className="text-gray-800 p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full  bg-white p-3 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
            {savingData?.map((item) => {
              const { icon, bgColor, bgHover } = getCategoryDetails(
                item.category
              );
              return (
                <Link href={`/dashboard/savings/${item._id}`} key={item.id}>
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
                      <div className="mt-4 flex flex-wrap gap-4 h-[100px]">
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
       
          <UserSavingsForm isOpen={isOpen} setIsOpen={setIsOpen}  />
        
      </div>
    </div>
  );
};

export default Savings;
