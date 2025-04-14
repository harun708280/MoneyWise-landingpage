"use client"

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useGetUserByEmailQuery } from "@/redux/Api/userApi";
import Loading from "../loading";
import { useAddTransactionMutation } from "@/redux/Api/transaction";
import { toast } from "sonner";
import { usePathname } from 'next/navigation';

export default function AddTransaction() {
  const pathname = usePathname();
  const isAccountsPage = pathname === '/dashboard/accounts';
  const [activeTab, setActiveTab] = useState(isAccountsPage ? "income" : "expense");
  const { user, isSignedIn } = useUser();
  
  

  // Get user email safely
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || null;
 

  // Fetch user data if email is available (avoiding multiple calls)
  const { data: userData, isLoading, isError } = useGetUserByEmailQuery(userEmail, {
    skip: !userEmail,
  });

  const [addTransaction, { isSuccess, error,isLoading:addTransactionLoad }] = useAddTransactionMutation();

  // Prevent unnecessary re-fetching
  useEffect(() => {
    if (userData) {
      
    }
  }, [userData]);

  // Handle loading states
  if (!isSignedIn) return <Loading />;
  if (isLoading) return <Loading />;


  // Define categories
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
    amount: "",
    category: "",
    note: "",
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
    if (!userEmail) {
      
      return;
    }
  
    const transactionData = {
      user: userData?._id,
      type: activeTab, 
      amount: values.amount,
      category: values.category,
      note: values.note,
      date: values.date,
    };

   
    
  
    try {
      
      setSubmitting(true);
  
      const response = await addTransaction(transactionData).unwrap();
  
      toast.success("Transaction added successfully!");
      resetForm();
    } catch (err) {
      console.error("❌ Error adding transaction:", err);
  
      
      if (err.data) {
        toast.error(`Failed to add transaction: ${err.data.message || "Please try again."}`)
      } else {
        toast.error("Failed to add transaction. Please try again.")
      }
    } finally {
      setSubmitting(false); 
    }
  };


  return (
    <div className="">
      

      {/* Tab System */}
      

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        
        <Form>
          <div className="mb-4">
            <label className="block font-semibold">Amount</label>
            <Field type="number" name="amount" className="w-full p-2 border rounded-md" />
            <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Category</label>
            <Field as="select" name="category" className="w-full p-2 border rounded-md">
              <option value="">Select Category</option>
              {categories[activeTab].map((cat) => (
                <option key={cat.name} value={cat.name} >
                  {cat.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Note</label>
            <Field type="text" name="note" className="w-full p-2 border rounded-md" />
            <ErrorMessage name="note" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Date</label>
            <Field type="date" name="date" className="w-full p-2 border rounded-md" />
            <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            
            className="w-full flex items-center justify-center bg-gradient-to-r  from-blue-900 to-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            <PlusCircle className="mr-2" />
            {addTransactionLoad?'Loading....':'Add'}
          </button>
        </Form>
      
      </Formik>
    </div>
  );
}