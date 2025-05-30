"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

import Loading from "../loading";
import { useUpdateTransactionMutation } from "@/redux/Api/transaction";
import { toast } from "sonner";

const UpdateTransaction=({setIsOpen,isOpen,txn})=> {
    const [updateTransaction]=useUpdateTransactionMutation()
 
  const activeTab=txn.type
  
  

 
  
  const categories = {
    expense: [
      { name: "Food", color: "#FF6347" },
      { name: "Shopping", color: "#FFA500" },
      { name: "Transport", color: "#4682B4" },
      { name: "Health", color: "#32CD32" },
      { name: "Entertainment", color: "#8A2BE2" },
      { name: "Education", color: "#FFD700" },
      { name: "Bills", color: "#DC143C" },
      { name: "Subscriptions", color: "#00CED1" },
      { name: "Investment", color: "#556B2F" },
      { name: "Family", color: "#FF69B4" },
      { name: "Others", color: "#808080" },
    ],
    income: [
      { name: "Salary", color: "#32CD32" },
      { name: "Freelancing", color: "#4682B4" },
      { name: "Investments", color: "#FFD700" },
      { name: "Business", color: "#FFA500" },
      { name: "Rental Income", color: "#8A2BE2" },
      { name: "Dividends", color: "#00CED1" },
      { name: "Gifts", color: "#DC143C" },
      { name: "Grants", color: "#556B2F" },
      { name: "Bonuses", color: "#FF6347" },
      { name: "Family", color: "#FF69B4" },
      { name: "Others", color: "#808080" },
    ],
  };

  // Define initial form values
  const initialValues = {
    type: activeTab,
    amount: txn.amount,
    category:txn.category,
    note: txn.note,
    date: new Date().toISOString().split("T")[0],
  };

  // Define validation schema
  const validationSchema = Yup.object({
    amount: Yup.number().positive("Amount must be positive").required("Amount is required"),
    category: Yup.string().required("Category is required"),
    note: Yup.string(),
    date: Yup.date().required("Date is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
     
      await updateTransaction({ id: txn._id, updatedData: values }); 
      resetForm();
      toast.success('Successfully updated done', {
        style: {
         
          color: 'green',
        
        },
      });
      setIsOpen(false)
    } catch (er) {
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="z-50">
      {/* Tab System */}
      <div className="flex mb-4 text-black">
        <button
          
          className={`flex-1 p-2 rounded-l-md transition-colors duration-300 ${
            activeTab === "expense"
              ? "bg-gradient-to-r from-blue-700 to-blue-400 text-white shadow-md hover:from-blue-600 hover:to-purple-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Expense
        </button>
        <button
         
          className={`flex-1 p-2 rounded-r-md ${
            activeTab === "income" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Add Money
        </button>
      </div>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div className="mb-4 text-black">
            <label className="block font-semibold">Amount</label>
            <Field type="number" name="amount"  className="w-full p-2 border rounded-md" />
            <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4 text-black">
            <label className="block font-semibold">Category</label>
            <Field as="select" name="category" className="w-full p-2 border rounded-md">
              <option value="">Select Category</option>
              {categories[activeTab].map((cat) => (
                <option key={cat.name} value={cat.name} style={{ backgroundColor: cat.color }}>
                  {cat.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4 text-black">
            <label className="block font-semibold">Note</label>
            <Field type="text" name="note" className="w-full p-2 border rounded-md" />
            <ErrorMessage name="note" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4 text-black">
            <label className="block font-semibold">Date</label>
            <Field type="date" name="date" className="w-full p-2 border rounded-md" />
            <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="w-full flex items-center text-sm font-bold justify-center bg-gradient-to-r  from-blue-900 to-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            <PlusCircle className="mr-2" />
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default UpdateTransaction