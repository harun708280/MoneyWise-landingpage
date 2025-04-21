import { Bell } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const NotiFication = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Bell className="text-gray-900 border h-10 w-10 rounded-full p-2 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 mt-1 mr-16">
        <div className="space-y-2">
          <h4 className="font-medium text-lg">Notifications</h4>
          <div className="bg-gray-100  text-sm p-3 rounded-lg shadow-sm border border-white/10">
            ✅ Account created successfully!
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NotiFication
