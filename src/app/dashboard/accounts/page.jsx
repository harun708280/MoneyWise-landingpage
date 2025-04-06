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
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useUserByEmail from "@/hooks/user";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { AnimatedModalDemo } from "../transactions/component/AnimatedModalDemo";
import { useIncomeByEmailAndTotalQuery } from "@/redux/Api/transaction";

const AccountAndWallet = () => {
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || null;
  const { user: userData, isLoading, isError, error } = useUserByEmail(email);
  const {data:incomeData}=useIncomeByEmailAndTotalQuery(email)
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
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-900 to-blue-500 backdrop-blur-lg border border-white/10 h-[70px] gap-12 rounded-lg overflow-hidden">
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
              <Card className="bg-gradient-to-br from-green-300 to-green-500 text-black rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                     
                        <Image
                          src={userData?.photo}
                          alt="User Profile"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      
                      <div>
                        <p className="font-semibold text-white">{userData?.firstName} {userData?.lastName}</p>
                        <p className="text-sm text-white">{userData?.email}</p>
                      </div>
                    </div>
                    <div className="text-green-800 font-semibold">{walletData.growth}</div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-white">Total Balance</p>
                    <p className="text-3xl font-bold text-white">${incomeData?.walletTotal}</p>
                  </div>
                  <div className="mt-6 flex  gap-8">
                    {/* <Button className="bg-white text-black rounded-full px-6 py-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 mr-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h4.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Withdraw
                    </Button> */}
                    {/* <Button className="bg-white text-black rounded-full px-6 py-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 mr-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 101.06 1.06l1.72-1.72H15.75a.75.75 0 000-1.5h-4.69l1.72-1.72a.75.75 0 10-1.06-1.06l-3 3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Deposit
                    </Button> */}
                    <AnimatedModalDemo />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
                    <KeyRound className="w-6 h-6" />
                    Security
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
                </CardContent>
              </Card>
              <Button className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:text-purple-300 border border-purple-500/30">
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    Settings
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
                </CardContent>
              </Card>
              <Button className="bg-gray-700 text-white hover:bg-gray-600 border border-gray-700">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountAndWallet;
