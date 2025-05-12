"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter, // You weren't using this
  // SidebarHeader, // You weren't using this
  // SidebarRail, // You weren't using this
} from "@/components/ui/sidebar";
import {
  CalendarCheck, // You weren't using this
  LayoutDashboard,
  Mail, // You weren't using this
  TrendingUp, // You weren't using this
  Users, // You weren't using this
  User, // You weren't using this
  Settings, // You weren't using this
  HelpCircle,
  LogOut,
  ListChecks,
  PiggyBank, // You weren't using this
  Wallet,
  Target,
  BarChart4,
  Home, // Import the Home icon
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export function AppSidebar(props) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/transactions", label: "Transactions", icon: ListChecks },
    { href: "/dashboard/savings", label: "Budgets & Goals", icon: Target },
    { href: "/dashboard/accounts", label: "Accounts & Wallets", icon: Wallet },
    { href: "/dashboard/analysis", label: "Reports & Analytics", icon: BarChart4 },
  ];

  const bottomNavItems = [
    { href: "/dashboard/help", label: "Help", icon: HelpCircle },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="relative ">
        <div className="space-y-4 py-4 p-5 bg-blue-900 backdrop-blur-md border-r border-gray-300 h-screen transition-transform transform">
          <div className="px-3 py-2">
            <Link href={"/"}>
              <div className="flex gap-2 items-center text-gray-100 text-xl uppercase font-bold">
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
              
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-blue-800 hover:text-gray-100 ${
                    pathname === item.href ? "bg-blue-800 text-gray-100" : "text-gray-300"
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link
                href="/"
                className={`group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-blue-800 hover:text-gray-100 ${
                  pathname === "/" ? "bg-blue-800 text-gray-100" : "text-gray-300"
                }`}
              >
                <Home className="h-6 w-6" />
                <span>Home</span>
              </Link>
            </div>
          </div>

          <div className="px-3 py-2 absolute bottom-0 lg:w-[200px]">
            <div className="space-y-1">
              {bottomNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex w-full items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-blue-800 hover:text-gray-100 ${
                    pathname === item.href ? "bg-blue-800 text-gray-100" : "text-gray-300"
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.label}</span>
                </Link>
              ))}

              <SignOutButton>
                <div className="flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-blue-800 hover:text-gray-100 text-gray-300 cursor-pointer">
                  <LogOut className="h-5 w-5" />
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