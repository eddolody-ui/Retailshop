import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/contentarea"
export function OrderPage() {
  return (
    <SidebarProvider>
  <div className="flex min-h-screen w-full">
    {/* Sidebar */}
    <AppSidebar />

    {/* Main content */}
    <SidebarInset className="flex flex-col w-full">
      <h1 className="text-xl font-bold p-4">Order Page</h1>
    </SidebarInset>
  </div>
</SidebarProvider>

  )
}
