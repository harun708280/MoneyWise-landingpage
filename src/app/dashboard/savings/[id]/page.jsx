"use client";
import { useGetSavingByIdQuery } from "@/redux/Api/savingApi";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Loader from "@/components/global/Loader";
import Image from "next/image";
import SavingDataChart from "../component/Saving";
import TnxAddModal from "../component/TnxAddModal";
import { Pen } from "lucide-react";

const SavingDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const {
    data: detailsSaving,
    isLoading,
    isError,
    error,
  } = useGetSavingByIdQuery(params.id);

  if (isLoading) {
    return <Loader />;
  }

  if (!detailsSaving) {
    return <div className="text-center p-6">Saving details not found.</div>;
  }

  const {
    accountName,
    category,
    targetAmount,
    currentAmount,
    reason,
    startDate,
    endDate,
    recurring,
    transactions,
  } = detailsSaving;

  return (
    <div className="container mx-auto">
      <div className="relative h-[300px] w-full overflow-hidden rounded-md mb-6">
        <Image
          src="/savingdetails.jpg"
          alt="save"
          fill
          className="object-cover opacity-60 rounded-md"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <h2 className="text-3xl z-20  md:text-7xl lg:text-5xl font-extrabold mb-2">
            Saving Goal Details
          </h2>
          <p className="text-lg md:text-xl mb-4 z-20">
            {accountName} - {category}
          </p>
          {currentAmount !== targetAmount ? (
            <button
              onClick={() => setIsOpen(true)}
              className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-900 to-blue-500 rounded-md hover:bg-sky-600 transition-colors duration-300 z-20"
            >
              <span className="absolute inset-0 rounded-md animate-ping bg-gradient-to-r from-blue-900 to-blue-500 opacity-75"></span>
              <span className="relative">Add Savings Transactions</span>
            </button>
          ) : (
            <p className="text-2xl font-bold text-white z-20 ">
              Already This Saving Goals Complete
            </p>
          )}
        </div>
        <div className="bg-black opacity-20 absolute inset-0 rounded-md"></div>
      </div>

      <div className="text-black rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{accountName}</h3>
        <div className="flex gap-12">
          <table className="w-[70%] bg-white rounded-md border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="font-semibold pr-4 p-2 border border-gray-300">
                  Category:
                </td>
                <td className="p-2 border border-gray-300">{category}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 p-2 border border-gray-300">
                  Reason:
                </td>
                <td className="p-2 border border-gray-300">{reason}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 p-2 border border-gray-300">
                  Target Amount:
                </td>
                <td className="p-2 border border-gray-300">
                  {targetAmount.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 p-2 border border-gray-300">
                  Current Amount:
                </td>
                <td className="p-2 border border-gray-300">
                  {currentAmount.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 p-2 border border-gray-300">
                  Start Date:
                </td>
                <td className="p-2 border border-gray-300">
                  {new Date(startDate).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 p-2 border border-gray-300">
                  End Date:
                </td>
                <td className="p-2 border border-gray-300">
                  {new Date(endDate).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 p-2 border border-gray-300">
                  Recurring:
                </td>
                <td className="p-2 border border-gray-300">{recurring}</td>
              </tr>
            </tbody>
          </table>
          <SavingDataChart
            targetAmount={targetAmount}
            currentAmount={currentAmount}
          />
        </div>
      </div>

      <div className="bg-white text-black rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Transactions</h3>
        {transactions && transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.date).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.amount.toLocaleString()}
                    </td>
                    <td className="">
                      <button className="">
                        <Pen></Pen>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No transactions available.</p>
        )}
      </div>
      <TnxAddModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={params.id}
        currentAmount={currentAmount}
        targetAmount={targetAmount}
      />
    </div>
  );
};

export default SavingDetails;
