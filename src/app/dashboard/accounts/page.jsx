"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet,
  LogOut,
  PlusCircle,
  CreditCard,
  KeyRound,
  Settings,
  Lock,
  PiggyBank,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useUserByEmail from "@/hooks/user";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { AnimatedModalDemo } from "../transactions/component/AnimatedModalDemo";
import { useIncomeByEmailAndTotalQuery } from "@/redux/Api/transaction";
import Loading from "../transactions/loading";

const AccountAndWallet = () => {
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || null;
  const { user: userData, isLoading, isError, error } = useUserByEmail(email);
  const { data: incomeData,isLoading:dataLoading } = useIncomeByEmailAndTotalQuery(email);


  if (dataLoading && isLoading) {
    return <Loading/>
  }

  console.log(incomeData);
  

  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "2023-01-15",
  };

  const walletData = {
    balance: 12345.67,
    currency: "USD",
    accountNumber: "1234567890",
  };

  const securityData = {
    twoFactorAuth: true,
    lastLogin: "2024-07-24 10:00 AM",
  };

  const settingsData = {
    language: "English",
    notifications: true,
    darkMode: true,
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const walletCards = [
    {
      title: "Total Balance",
      value: incomeData?.walletTotal || 0,
      icon: <Wallet className="w-6 h-6 text-green-400" />,
      color: "bg-gradient-to-br from-green-300 to-green-500",
      buttonText: "Deposit",
    },
    {
      title: "Total Income",
      value: incomeData?.totalIncome || 0,
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      color: "bg-gradient-to-br from-blue-300 to-blue-500",
      buttonText: "Add Income",
    },
    {
      title: "Total Expense",
      value: incomeData?.totalExpense || 0,
      icon: <TrendingDown className="w-6 h-6 text-red-400" />,
      color: "bg-gradient-to-br from-red-300 to-red-500",
      buttonText: "Add Expense",
    },
    {
      title: "Savings",
      value: incomeData?.totalSavings || 0,
      icon: <PiggyBank className="w-6 h-6 text-yellow-400" />,
      color: "bg-gradient-to-br from-yellow-300 to-yellow-500",
      buttonText: "Add Savings",
    },
  ];

  return (
    <div className="min-h-screen text-gray-900 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
        >
          Account & Wallet
        </motion.h1>

        <Tabs defaultValue="wallet" className="w-full space-y-4">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <TabsList className="grid w-full grid-cols-3 bg-blue-600/60 backdrop-blur-lg border border-white/10 h-[70px] gap-12 rounded-lg overflow-hidden">
              <TabsTrigger
                value="wallet"
                className={cn(
                  "text-white py-3 sm:py-4 text-sm sm:text-base font-medium",
                  "hover:bg-white/10 hover:text-white transition-colors duration-200",
                  "data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400",
                  "flex items-center justify-center gap-2"
                )}
              >
                <Wallet className="h-4 w-4" /> Wallet
              </TabsTrigger>

              <TabsTrigger
                value="security"
                className={cn(
                  "text-white py-3 sm:py-4 text-sm sm:text-base font-medium",
                  "hover:bg-white/10 hover:text-white transition-colors duration-200",
                  "data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400",
                  "flex items-center justify-center gap-2"
                )}
              >
                <KeyRound className="h-4 w-4" /> Security
              </TabsTrigger>

              <TabsTrigger
                value="settings"
                className={cn(
                  "text-white py-3 sm:py-4 text-sm sm:text-base font-medium",
                  "hover:bg-white/10 hover:text-white transition-colors duration-200",
                  "data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400",
                  "flex items-center justify-center gap-2"
                )}
              >
                <Settings className="h-4 w-4" /> Settings
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Wallet Tab */}
            <TabsContent value="wallet" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {walletCards.map((card, index) => (
                  <Card
                    key={index}
                    className={`${card.color} text-black rounded-3xl`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {card.icon}
                          <div>
                            <p className="font-semibold text-white">
                              {userData?.firstName} {userData?.lastName}
                            </p>
                            <p className="text-sm text-white">{userData?.email}</p>
                            <p className="text-sm text-white">
                              ID: {userData?._id}
                            </p>
                          </div>
                        </div>
                        <div className="text-green-800 font-semibold">
                          {walletData.growth}
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-lg font-bold text-white">
                          {card.title}
                        </p>
                        <p className="text-3xl font-bold text-white">
                          ${card.value}
                        </p>
                      </div>
                      <div className="mt-6 flex gap-8">
                        {
                          index===0 ?<AnimatedModalDemo />:<Button className="bg-white/20 text-white hover:bg-white/30">
                          {card.buttonText}
                        </Button>
                        }
                        
                        
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card className="bg-blue-400  backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
                    <KeyRound className="w-6 h-6" /> Security
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your account security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      Two-Factor Authentication
                      {securityData.twoFactorAuth ? (
                        <span className="text-green-400">(Enabled)</span>
                      ) : (
                        <span className="text-red-400">(Disabled)</span>
                      )}
                    </Label>
                    <p className="text-gray-400">
                      {securityData.twoFactorAuth
                        ? "Two-factor authentication is enabled for your account."
                        : "Enable two-factor authentication for enhanced security."}
                    </p>
                  </div>
                  <div>
                    <Label className="text-white">Last Login</Label>
                    <Input
                      value={securityData.lastLogin}
                      readOnly
                      className="bg-black/20 text-white border-gray-700"
                    />
                  </div>
                  <Button className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:text-purple-300 border border-purple-500/30 w-full">
                    <Lock className="mr-2 h-4 w-4" /> Change Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
                    <Settings className="w-6 h-6" /> Settings
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Customize your application preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Language</Label>
                    <Input
                      value={settingsData.language}
                      readOnly
                      className="bg-black/20 text-white border-gray-700"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Notifications</Label>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-sm",
                        settingsData.notifications
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      )}
                    >
                      {settingsData.notifications ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Dark Mode</Label>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-sm",
                        settingsData.darkMode
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-700 text-gray-400"
                      )}
                    >
                      {settingsData.darkMode ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <Button className="bg-gray-700 text-white hover:bg-gray-600 border border-gray-700 w-full">
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountAndWallet;