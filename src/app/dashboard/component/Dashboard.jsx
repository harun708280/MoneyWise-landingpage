
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./ModeToggle"


export default function Page() {
  return (
    
     
      <SidebarInset>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid  gap-4 grid-cols-1 md:grid-cols-4">
            <div className="bg-blue-500 aspect-video rounded-xl text-center">
                
            </div>
            <div className="aspect-video rounded-xl bg-pink-600/50 dark:bg-green-600" />
            <div className="aspect-video rounded-xl bg-amber-600/50" />
            <div className="bg-blue-500 rounded-xl aspect-video text-center">
                
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
   
  )
}
