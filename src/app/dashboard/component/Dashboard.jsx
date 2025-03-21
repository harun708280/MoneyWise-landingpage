
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
import CompareDaily from "./CompareDaily"
import DailyCost from "./DailyCost"
import IncomeExpense  from "./IncomeExpense"
import Money from "./Money"
import { SectionCards } from "./SectionCards"


export default function Page() {
  return (
    
     
      <SidebarInset>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="">
          <SectionCards/>
          </div>
          <div className="grid  gap-4 grid-cols-1 md:grid-cols-3">
            <div className="bg-blue-500 aspect-video rounded-xl text-center">
                <Money/>
            </div>
            <div className="aspect-video rounded-xl bg-pink-600/50 dark:bg-green-600" >
            <IncomeExpense/>
            </div>
            
            <div className="bg-blue-500 rounded-xl aspect-video text-center">
                <CompareDaily/>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <DailyCost></DailyCost>
          </div>
        </div>
      </SidebarInset>
   
  )
}
