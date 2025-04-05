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

const AccountAndWallet = () => {
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
              <Card className="bg-white backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    <Wallet className="w-6 h-6" />
                    Your Wallet
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your wallet balance and account information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <Label className="text-gray-700">Balance</Label>
                      <div className="text-3xl font-bold text-green-500 flex items-center">
                        ${walletData.balance}
                        <span className="ml-2 text-lg text-gray-600">
                          {walletData.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-4">
                <Button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 border border-green-500/30 flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Deposit
                </Button>

                <Button className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:text-purple-300 border border-purple-500/30">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment
                </Button>
              </div>
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
