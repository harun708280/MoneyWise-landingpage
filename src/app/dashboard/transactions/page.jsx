// TransactionsPage.js
"use client";
import { Printer, MoreVertical, Edit, Delete, Share } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/global/Loader";
import {
  useAllTransactionByEmailQuery,
  useDeleteTransactionMutation,
} from "@/redux/Api/transaction";
import { AnimatedModalDemo } from "./component/AnimatedModalDemo";
import MyModal from "../component/Dialog";

export default function TransactionsPage() {
  const { user, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [tnxId, setTnxId] = useState();

  const email = user?.emailAddresses?.[0]?.emailAddress || null;

  // Hooks গুলোকে শর্তসাপেক্ষ ব্লকের বাইরে কল করুন
  const { data: transactions, isLoading } = useAllTransactionByEmailQuery(email);
  const [deleteTransaction] = useDeleteTransactionMutation();

  if (!isSignedIn || isLoading) {
    return <Loader />;
  }

  const confirmDeleteTransaction = (id) => {
    toast("Are you sure you want to delete this?", {
      duration: 5000,
      action: {
        label: "Confirm",
        onClick: () => handleDeleteTransaction(id),
      },
      cancelAction: {
        label: "Cancel",
        onClick: () => toast.info("Deletion cancelled."),
      },
    });
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      toast.success("Item deleted successfully!", { duration: 2000 });
    } catch (error) {
      toast.error("Failed to delete the item.");
    }
  };

  return (
    <div className="p-6 bg-muted/50 min-h-screen text-black max-w-7xl mx-auto rounded-2xl">
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
            <AnimatedModalDemo />
            <button className="bg-gradient-to-r  from-blue-900 to-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-3">
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
              {transactions?.map((txn, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{txn.user}</td>
                  <td className="border px-4 py-2 capitalize">{txn.type}</td>
                  <td className="border px-4 py-2">${txn.amount.toFixed(2)}</td>
                  <td className="border px-4 py-2">{txn.category}</td>
                  <td className="border px-4 py-2">{txn.note}</td>
                  <td className="border px-4 py-2">
                    {new Date(txn.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(txn.createdAt).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2 ">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreVertical size={18} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem onClick={() => { setIsOpen(true); setTnxId(txn._id); }}>
                          <Edit /> Edit
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          onClick={() => confirmDeleteTransaction(txn._id)}
                        >
                          <Delete /> Delete
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          <Share /> Share
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} txn={tnxId} />
    </div>
  );
}