"use client";

import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  CalendarCheck,
  LayoutDashboard,
  Mail,
  TrendingUp,
  Users,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ListChecks,
  PiggyBank,
  Wallet,
  Target,
  BarChart4,
} from "lucide-react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="relative">
        <div className="space-y-4 py-4 p-5  border-r border-gray-300 bg-gray-50 h-screen  transition-transform transform">
          <div className="px-3 py-2">
            <Link href={"/"}>
              <div className="flex gap-2 items-center  text-gray-800 text-xl uppercase font-bold">
                <Image
                  src={"/logo.jpg"}
                  alt="logo"
                  height={35}
                  width={35}
                  className="rounded-lg"
                />
                <p>Money Wise</p>
              </div>
            </Link>
            <div className="space-y-1 mt-4 md:mt-7">
              <Link
                href="/dashboard"
                className="group flex items-center space-x-2 rounded-md p-2 text-sm font-medium  hover:bg-gray-100"
              >
                <LayoutDashboard className="h-6 w-6 text-blue-800 " />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/dashboard/transactions"
                className="group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-gray-100"
              >
                <ListChecks className="h-6 w-6 text-blue-800 " />
                <span>Transactions</span>
              </Link>
              <Link
                href="/dashboard/savings"
                className="group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-gray-100"
              >
                <Target className="h-6 w-6 text-blue-800 " />
                <span>Budgets & Goals</span>
              </Link>
              <Link
                href="/dashboard/accounts"
                className="group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-gray-100"
              >
                <Wallet className="h-6 w-6 text-blue-800 " />
                <span>Accounts & Wallets</span>
              </Link>

              <Link
                href="/dashboard/analysis"
                className="group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-gray-100"
              >
                <BarChart4 className="h-6 w-6 text-blue-800 " />
                <span>Reports & Analytics</span>
              </Link>
            </div>
          </div>

          <div className="px-3 py-2"></div>
          <div className="px-3 py-2 absolute bottom-0">
            <div className="space-y-1">
              <a
                href="#"
                className="group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-gray-100"
              >
                <HelpCircle className="h-6 w-6 text-blue-800 " />
                <span>Help</span>
              </a>

              <SignOutButton>
                <div className="flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-gray-100">
                  <LogOut className="h-6 w-6 text-blue-800" />
                  <span>Logout</span>
                </div>
              </SignOutButton>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
