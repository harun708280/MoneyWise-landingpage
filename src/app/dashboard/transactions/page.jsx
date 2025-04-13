"use client";
import { Printer, MoreVertical, Edit, Delete, Share } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/global/Loader";
import { useAllTransactionByEmailQuery, useDeleteTransactionMutation } from "@/redux/Api/transaction";
import { AnimatedModalDemo } from "./component/AnimatedModalDemo";
import MyModal from "../component/Dialog";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TransactionsPage() {
  const { user, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [tnxId, setTnxId] = useState();
  const [selectedTab, setSelectedTab] = useState("all");

  const email = user?.emailAddresses?.[0]?.emailAddress || null;

  const { data: transactions, isLoading } = useAllTransactionByEmailQuery({
    email,
    type: selectedTab === "Income" ? "income" : selectedTab === "Expense" ? "expense" : "",
  });
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
    <Tabs defaultValue="all" onValueChange={setSelectedTab}>
      <div className="p-6  min-h-screen text-black  w-full mx-auto rounded-2xl">
        <div className="p-4 shadow bg-white rounded-md">
          <h2 className="text-xl font-bold mb-4">Transactions</h2>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-between items-center mb-4">
            <TabsList className="grid w-1/3 md:grid-cols-3 bg-gradient-to-r from-blue-900 to-blue-500">
              <TabsTrigger value="all"className={`${selectedTab==='all'?'text-black ':'text-white'}`}>
                All Transactions
              </TabsTrigger>
              <TabsTrigger value="Income" className={`${selectedTab==='Income'?'text-black':'text-white'}`}>
                Income Only
              </TabsTrigger>
              <TabsTrigger value="Expense" className={`${selectedTab==='Expense'?'text-black':'text-white'}`}>
                Expense Only
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4">
              <AnimatedModalDemo />
              <button className="bg-gradient-to-r from-blue-900 to-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-3">
                <Printer /> Export
              </button>
            </div>
          </div>

         
          <TabsContent value="all">
            <TransactionTable transactions={transactions} confirmDeleteTransaction={confirmDeleteTransaction} setIsOpen={setIsOpen} setTnxId={setTnxId} />
          </TabsContent>
          <TabsContent value="Income">
            <TransactionTable transactions={transactions} confirmDeleteTransaction={confirmDeleteTransaction} setIsOpen={setIsOpen} setTnxId={setTnxId} />
          </TabsContent>
          <TabsContent value="Expense">
            <TransactionTable transactions={transactions} confirmDeleteTransaction={confirmDeleteTransaction} setIsOpen={setIsOpen} setTnxId={setTnxId} />
          </TabsContent>
        </div>
        <MyModal isOpen={isOpen} setIsOpen={setIsOpen} txn={tnxId} />
      </div>
    </Tabs>
  );
}

function TransactionTable({ transactions, confirmDeleteTransaction, setIsOpen, setTnxId }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">No transactions have been recorded in the system</p>
      </div>
    );
  }
  return (
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
              <td className="border px-4 py-2">{new Date(txn.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(txn.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreVertical size={18} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { setIsOpen(true); setTnxId(txn._id); }} className="flex items-center cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => confirmDeleteTransaction(txn._id)} className="flex items-center cursor-pointer">
                      <Delete className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center cursor-pointer">
                      <Share className="mr-2 h-4 w-4" /> Share
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}