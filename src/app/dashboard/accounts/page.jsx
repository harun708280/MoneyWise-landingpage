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
  const { data: incomeData, isLoading: dataLoading } =
    useIncomeByEmailAndTotalQuery(email);

  if (dataLoading && isLoading) {
    return <Loading />;
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

  return (
    <div className="min-h-screen p-4 text-gray-900 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 sm:text-4xl md:text-5xl"
        >
          Account & Wallet
        </motion.h1>

        <Tabs defaultValue="wallet" className="w-full space-y-4">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <TabsList className="grid h-[70px] w-full grid-cols-3 gap-12 overflow-hidden rounded-lg border border-white/10 bg-blue-600/60 backdrop-blur-lg">
              <TabsTrigger
                value="wallet"
                className={cn(
                  "flex items-center justify-center gap-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10 hover:text-white py-3 sm:py-4",
                  "data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
                )}
              >
                <Wallet className="h-4 w-4" /> Wallet
              </TabsTrigger>

              <TabsTrigger
                value="security"
                className={cn(
                  "flex items-center justify-center gap-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10 hover:text-white py-3 sm:py-4",
                  "data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                )}
              >
                <KeyRound className="h-4 w-4" /> Security
              </TabsTrigger>

              <TabsTrigger
                value="settings"
                className={cn(
                  "flex items-center justify-center gap-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10 hover:text-white py-3 sm:py-4",
                  "data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
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
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Total Balance Card */}
                <Card className="rounded-3xl bg-gradient-to-br from-red-300 to-red-500  text-black">
                  <CardContent className="p-4">
                    <div className="mt-4">
                      <div className="flex gap-6 items-center">
                        <Image
                          src="/empty-wallet.png"
                          height={40}
                          width={40}
                          alt="wallet"
                          className="p-2 border rounded-full border-white/10"
                        />
                        <div className="">
                          <CardTitle className="text-xl font-bold text-white">
                            Total Balance
                          </CardTitle>
                        </div>
                      </div>
                      <div className="border-b-2 border-white/20 my-2"></div>
                      <p className="text-3xl font-bold text-white">
                        ${incomeData?.walletTotal || 0}
                      </p>
                    </div>
                    <div className="mt-6 flex gap-8">
                      <AnimatedModalDemo />
                    </div>
                  </CardContent>
                </Card>

                {/* Total Income Card */}
                <Card className="rounded-3xl bg-gradient-to-br from-blue-300 to-blue-500 text-black">
                  <CardContent className="p-4">
                    <div className="mt-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/direct-down.png"
                          height={40}
                          width={40}
                          alt="wallet"
                          className="border rounded-full border-gray-300 p-2"
                        />
                        <div>
                          <CardTitle className="text-xl text-white font-bold">Total Incomes</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1 text-gray-600" />
                        </div>
                      </div>
                      <div className="border-b-2 border-gray-300 my-2" />
                      <p className="text-3xl font-bold text-white">
                        ${incomeData?.totalIncome || 0}
                      </p>
                    </div>
                    <div className="mt-6 flex gap-8">
                      <Button className="border border-white/30 bg-white/20 text-white hover:bg-white/30">
                      <PlusCircle/>  Add Income
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Total Expense Card */}
                <Card className="rounded-3xl bg-gradient-to-br from-yellow-200 to-yellow-400  text-black">
                  <CardContent className="p-4">
                    <div className="mt-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/direct-up.png"
                          height={40}
                          width={40}
                          alt="wallet"
                          className="border rounded-full border-gray-300 p-2"
                        />
                        <div>
                          <CardTitle className="text-xl text-white font-bold">Total Expenses</CardTitle>
                        </div>
                      </div>
                      <div className="border-b-2 border-gray-300 my-2" />
                      <p className="text-3xl font-bold text-white">
                        ${incomeData?.totalExpense || 0}
                      </p>
                    </div>
                    <div className="mt-6 flex gap-8">
                      <Button className="border border-white/30 bg-white/20 text-white hover:bg-white/30">
                      <PlusCircle/>   Add Expense
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Savings Card */}
                <Card className="rounded-3xl bg-gradient-to-br from-green-300 to-green-500   text-black">
                  <CardContent className="p-4">
                    <div className="mt-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/save-2.png"
                          height={40}
                          width={40}
                          alt="wallet"
                          className="border rounded-full border-gray-300 p-2"
                        />
                        <div>
                          <CardTitle className="text-xl text-white font-bold">
                            Total Saving
                          </CardTitle>
                        </div>
                      </div>
                      <div className="border-b-2 border-gray-300 my-2" />
                      <p className="text-3xl font-bold text-white">
                        ${incomeData?.totalSavings || 0}
                      </p>
                    </div>
                    <div className="mt-6 flex gap-8">
                      <Button className="border border-white/30 bg-white/20 text-white hover:bg-white/30">
                      <PlusCircle/>  Add Savings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Tab */}
            {/* Settings Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card className="border border-white/10 bg-blue-400 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-white">
                    <KeyRound className="h-6 w-6" /> Security
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your account security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-white">
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
                      className="border-gray-700 bg-black/20 text-white"
                    />
                  </div>
                  <Button className="w-full border border-purple-500/30 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:text-purple-300">
                    <Lock className="mr-2 h-4 w-4" /> Change Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="border border-white/10 bg-white/5 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-white">
                    <Settings className="h-6 w-6" /> Settings
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
                      className="border-gray-700 bg-black/20 text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Notifications</Label>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-sm",
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
                        "rounded-full px-3 py-1 text-sm",
                        settingsData.darkMode
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-700 text-gray-400"
                      )}
                    >
                      {settingsData.darkMode ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <Button className="w-full border border-gray-700 bg-gray-700 text-white hover:bg-gray-600">
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
