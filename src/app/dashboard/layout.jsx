'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./component/app-sidebar";
import { ThemeProvider } from "./component/theme-provider";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "./component/ModeToggle";
import { UserButton, useUser } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { isLoaded, isSignedIn } = useUser();


  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in');
    }
  }, [isLoaded, isSignedIn]);

  
  if (!isLoaded) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-50" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar className="w-64 h-full fixed left-0 top-0 border-r border-blue-500 border-opacity-0" />
          <div className="flex flex-col flex-1">
            <div className="p-6">
              <header className="flex shrink-0 items-center gap-2">
                <div className="flex justify-between items-center gap-2 w-full px-4">
                  <div className="w-1/2">
                    <SidebarTrigger className="-ml-1 bg-blue-500 md:hidden" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                  </div>
                  <div className="px-5 py-2 flex bg-white rounded-4xl gap-3 items-center">
                    <Bell className="text-gray-800 border h-10 w-10 rounded-full p-2" />
                    <UserButton className="border h-10 w-10 rounded-full p-2" />
                  </div>
                </div>
              </header>
            </div>
            <div className="flex-1 px-6 w-full overflow-y-auto bg-gray-50">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
