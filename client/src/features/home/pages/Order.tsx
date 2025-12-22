import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar, TopNavbar } from "@/components/contentarea"
import { DataTableDemo } from "@/components/contentarea"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function Order() {
  return (
    
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />
        {/* Main content */}
        <SidebarInset className="flex flex-col w-full">
        <TopNavbar/>
          {/* Top bar with button */}
          <div className="flex justify-end p-4">
            <Link to="/Order/CreateOrder">
              <Button className="bg-white text-black border backdrop-blur-3xl">
                Create Order
              </Button>
            </Link>
          </div>

          {/* Content below */}
          <div className="p-4">
            <DataTableDemo/>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
