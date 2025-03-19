'use client'
import { Printer, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TransactionsPage() {
  // ✅ Provided Transaction Data
  const transactions = [
    {
      user: "67da7c0d377204107a3ef1ef",
      type: "expense",
      amount: 9,
      category: "Others",
      note: "Dignissimos et adipi",
      date: "1994-10-03T00:00:00.000+00:00",
      createdAt: "2025-03-19T14:46:29.193+00:00",
    },
    {
      user: "67da7c0d377204107a3ef1ef",
      type: "expense",
      amount: 80,
      category: "Grants",
      note: "Repudiandae consecte",
      date: "2020-03-31T00:00:00.000+00:00",
      createdAt: "2025-03-19T14:50:08.552+00:00",
    },
  ];

  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="p-6 bg-muted/50 min-h-screen max-w-7xl mx-auto rounded-2xl">
      <div className="p-4 shadow rounded-md">
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-between items-center mb-4">
          <div>
            <label className="font-semibold mr-5">Date</label>
            <select className="border px-2 py-2 rounded-md">
              <option className="bg-muted">Last Month</option>
              <option className="bg-muted">This Month</option>
              <option className="bg-muted">Last 3 Months</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <Link href={'/dashboard/transactions/add'}>
            <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md">
              + Add condition
            </button>
            </Link>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-3">
              <Printer /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="text-left">
                <th className="border px-4 py-2">User ID</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Note</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Created At</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{txn.user}</td>
                  <td className="border px-4 py-2 capitalize">{txn.type}</td>
                  <td className="border px-4 py-2">${txn.amount.toFixed(2)}</td>
                  <td className="border px-4 py-2">{txn.category}</td>
                  <td className="border px-4 py-2">{txn.note}</td>
                  <td className="border px-4 py-2">{new Date(txn.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{new Date(txn.createdAt).toLocaleString()}</td>
                  <td className="border px-4 py-2 relative">
                    {/* ✅ Three-dot menu button */}
                    <button
                      onClick={() => setOpenMenu(openMenu === index ? null : index)}
                      className="p-2 rounded-full cursor-pointer"
                    >
                      <MoreVertical size={18} />
                    </button>

                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
