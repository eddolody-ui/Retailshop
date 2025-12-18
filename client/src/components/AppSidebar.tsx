import { FiAirplay } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

import * as React from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Settings, User, Lock, ChevronDown } from "lucide-react"

type MenuItem = {
  title: string
  url?: string
  icon: React.FC<any>
  children?: MenuItem[]
}

const items: MenuItem[] = [
  { title: "Dashboard", url: "/", 
    icon: FiAirplay },
  
  { title: "Order",
    icon: FiShoppingCart,
    children: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Security", url: "/security", icon: Lock },
    ],
  },

 { title: "Shipper",
   icon: Settings,
   children: [
     { title: "Profile", url: "/profile", icon: User },
     { title: "Security", url: "/security", icon: Lock },
   ],
 },
]

export function AppSidebar() {
  // state to control which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = React.useState<Record<string, boolean>>({})

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <Sidebar collapsible="icon">
  <SidebarHeader className="flex-row items-center justify-between p-4">
    {/* Title */}
    <span className="group-data-[collapsible=icon]:hidden font-semibold">
      SHOPIFY
    </span>

    {/* Trigger inline with title */}
    <SidebarTrigger className="w-5 h-5"/>
  </SidebarHeader>

      <SidebarContent >
        <SidebarMenu className="text-sm ml-2 m-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} >
              
              {/* Main Button */}
              <SidebarMenuButton asChild>
                {item.children ? (
                  <button
                    className="flex items-center gap-2 w-full"
                    onClick={() => toggleDropdown(item.title)}
                  >
                    <TooltipProvider>
                      <Tooltip >
                        <TooltipTrigger asChild>
                          <item.icon />
                        </TooltipTrigger>
                      </Tooltip>
                    </TooltipProvider>

                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden ${
                        openDropdowns[item.title] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <a href={item.url} className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <item.icon />
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </a>
                )}
              </SidebarMenuButton>

              {/* Dropdown list */}
              {item.children && openDropdowns[item.title] && (
                <ul className="ml-8 pt-3">
                  {item.children.map((child) => (
                    <li key={child.title} className=" font-light mb-3">
                      <SidebarMenuSubItem>
                        <a href={child.url} className="flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipContent side="right" align="center">
                                {child.title}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <span className="group-data-[collapsible=icon]:hidden">
                            {child.title}
                          </span>
                        </a>
                      </SidebarMenuSubItem>
                    </li>
                  ))}
                </ul>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
