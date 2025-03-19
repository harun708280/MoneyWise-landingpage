"use client"

import React from "react";




import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-project";
import { TeamSwitcher } from "./team-switcheer";
import { NavUser } from "./nav-user";
import { CalendarCheck, GalleryVerticalEnd, HelpCircle, LayoutDashboard, ListChecks, Settings, Target, TrendingUp, Wallet } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

// This is sample data.
const data = {
  user: {
    name: "harun",
    email: "harun@.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "XyNexa",
      logo: GalleryVerticalEnd,
      plan: "Team collaboration",
    },
   
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard	",
        },
        
      ],
    },
    {
      title: "Transactions ",
      url: "#",
      icon: ListChecks,
      items: [
        {
          title: "All Transactions",
          url: "/dashboard/transactions",
        },
        {
          title: "Income Transactions",
          url: "#",
        },
        {
          title: "Expense Transactions",
          url: "#",
        },
        {
          title: "Add Transaction",
          url: "/dashboard/transactions/add",
        },
        {
          title: "Edit Transaction",
          url: "#",
        },
      ],
    },
    {
      title: "Accounts & Wallets",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "All Accounts",
          url: "#",
        },
        {
          title: "Add Account",
          url: "#",
        },
        {
          title: "Edit Account	",
          url: "#",
        },
       
      ],
    },
    {
      title: "Budgets & Goals ",
      url: "#",
      icon: Target,
      items: [
        {
          title: "All Budgets",
          url: "#",
        },
        {
          title: "Add Budget",
          url: "#",
        },
        {
          title: "Edit Budget	",
          url: "#",
        },
        {
          title: "Financial Goals	",
          url: "#",
        },
        {
          title: "Add Goal",
          url: "#",
        },
       
      ],
    },
    {
      title: "Reports & Analytics",
      url: "#",
      icon: TrendingUp,
      items: [
        {
          title: "Financial Reports",
          url: "#",
        },
        {
          title: "Monthly Reports",
          url: "#",
        },
        {
          title: "Annual Reports	",
          url: "#",
        },
        {
          title: "Category-wise Reports	",
          url: "#",
        },
       
      ],
    },
    {
      title: "Reminders & Bills",
      url: "#",
      icon: CalendarCheck,
      items: [
        {
          title: "All Bills & Payments",
          url: "#",
        },
        {
          title: "Add Bill",
          url: "#",
        },
        {
          title: "Bill Reminders	",
          url: "#",
        },
        
       
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Profile Settings",
          url: "#",
        },
        {
          title: "Security Settings",
          url: "#",
        },
        {
          title: "Theme Customization",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Help & Support ",
      url: "#",
      icon:HelpCircle,
    },
    
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <UserButton  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
