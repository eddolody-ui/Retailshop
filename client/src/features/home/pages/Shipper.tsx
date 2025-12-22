import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar, TopNavbar } from "@/components/contentarea"
import { DataTableDemo } from "@/components/contentarea"

export function Shipper() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />
        {/* Main content */}
        <SidebarInset className="flex flex-col w-full">
        <TopNavbar/>
          {/* Content below */}
          <div className="p-4">
            <DataTableDemo/>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
