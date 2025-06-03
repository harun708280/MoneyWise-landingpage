"use client";
import { useState } from "react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/global/Loader";
import {
  useAllTransactionByEmailQuery,
  useDeleteTransactionMutation,
} from "@/redux/Api/transaction";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  PrinterOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileExcelOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Table, Dropdown, Menu, Button } from "antd";

import { AnimatedModalDemo } from "./component/AnimatedModalDemo";
import MyModal from "../component/Dialog";

export default function TransactionsPage() {
  const { user, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [tnxId, setTnxId] = useState();
  const [selectedTab, setSelectedTab] = useState("all");

  const email = user?.emailAddresses?.[0]?.emailAddress || null;

  const { data: transactions, isLoading } = useAllTransactionByEmailQuery({
    email,
    type:
      selectedTab === "Income"
        ? "income"
        : selectedTab === "Expense"
        ? "expense"
        : "",
  });

  const [deleteTransaction] = useDeleteTransactionMutation();

  if (!isSignedIn || isLoading) {
    return <Loader />;
  }

  // CSV Export
  const exportToCSV = () => {
    const headers = ["User", "Type", "Amount", "Category", "Note", "Date", "Created At"];
    const rows = transactions.map(txn => [
      txn.user,
      txn.type,
      `$${txn.amount.toFixed(2)}`,
      txn.category,
      txn.note,
      new Date(txn.date).toLocaleDateString(),
      new Date(txn.createdAt).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF/PNG Export
  const exportAsImageOrPDF = async (type = "png") => {
    const element = document.getElementById("transactions-table");
    if (!element) return;

    const canvas = await html2canvas(element);
    if (type === "png") {
      const link = document.createElement("a");
      link.download = "transactions.png";
      link.href = canvas.toDataURL();
      link.click();
    } else if (type === "pdf") {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("transactions.pdf");
    }
  };

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

  const exportMenu = (
    <Menu>
      <Menu.Item key="png" icon={<FileImageOutlined />} onClick={() => exportAsImageOrPDF("png")}>
        Export as PNG
      </Menu.Item>
      <Menu.Item key="pdf" icon={<FilePdfOutlined />} onClick={() => exportAsImageOrPDF("pdf")}>
        Export as PDF
      </Menu.Item>
      <Menu.Item key="csv" icon={<FileExcelOutlined />} onClick={exportToCSV}>
        Export as CSV
      </Menu.Item>
    </Menu>
  );

  return (
    <Tabs defaultValue="all" onValueChange={setSelectedTab}>
      <div className="p-6 min-h-screen text-black w-full mx-auto rounded-2xl">
        <div className="p-4 shadow bg-white rounded-md">
          <h2 className="text-xl font-bold mb-4">Transactions</h2>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-between items-center mb-4">
            <TabsList className="grid w-1/3 md:grid-cols-3 bg-gradient-to-r from-blue-900 to-blue-500">
              <TabsTrigger value="all" className={selectedTab === "all" ? "text-black" : "text-white"}>
                All Transactions
              </TabsTrigger>
              <TabsTrigger value="Income" className={selectedTab === "Income" ? "text-black" : "text-white"}>
                Income Only
              </TabsTrigger>
              <TabsTrigger value="Expense" className={selectedTab === "Expense" ? "text-black" : "text-white"}>
                Expense Only
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4">
              <AnimatedModalDemo />
              <Dropdown overlay={exportMenu} trigger={["hover"]}>
                <button className="bg-gradient-to-r from-blue-900 to-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-3">
                  <PrinterOutlined /> Export
                </button>
              </Dropdown>
            </div>
          </div>

          <TabsContent value="all">
            <TransactionTable
              transactions={transactions}
              confirmDeleteTransaction={confirmDeleteTransaction}
              setIsOpen={setIsOpen}
              setTnxId={setTnxId}
            />
          </TabsContent>

          <TabsContent value="Income">
            <TransactionTable
              transactions={transactions}
              confirmDeleteTransaction={confirmDeleteTransaction}
              setIsOpen={setIsOpen}
              setTnxId={setTnxId}
            />
          </TabsContent>

          <TabsContent value="Expense">
            <TransactionTable
              transactions={transactions}
              confirmDeleteTransaction={confirmDeleteTransaction}
              setIsOpen={setIsOpen}
              setTnxId={setTnxId}
            />
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

  const columns = [
    {
      title: "User ID",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="edit"
              icon={<EditOutlined />}
              onClick={() => {
                setIsOpen(true);
                setTnxId(record._id);
              }}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              onClick={() => confirmDeleteTransaction(record._id)}
            >
              Delete
            </Menu.Item>
            <Menu.Item key="share" icon={<ShareAltOutlined />}>
              Share
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div id="transactions-table">
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={transactions}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
}
