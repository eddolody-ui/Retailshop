import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { SheetDemo } from "@/components/SheetDemo"
import { TopNavbar } from "@/components/TopNavbar"

export function HomePage() {
  return (
    <SidebarProvider>
  <div className="flex min-h-screen w-full">
    {/* Sidebar */}
    <AppSidebar />

    {/* Main content */}
    <SidebarInset className="flex flex-col w-full">
      {/* Top Navbar */}
      <TopNavbar />

      {/* Page content */}
      <main className="flex-1 p-4">
      </main>
    </SidebarInset>
  </div>
</SidebarProvider>

  )
}
