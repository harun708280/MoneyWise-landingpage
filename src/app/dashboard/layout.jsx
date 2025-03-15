import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./component/app-sidebar";
import { ThemeProvider } from "./component/theme-provider";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen  " suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
     <SidebarProvider >
     <AppSidebar className="w-64 h-full fixed left-0 top-0 border-r   " />
      
     
      <div className="flex-1  p-6   overflow-y-auto ">
        {children}
      </div>
     </SidebarProvider>
     </ThemeProvider>
    </div>
  );
}
