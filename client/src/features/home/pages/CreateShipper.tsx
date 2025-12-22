import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AppSidebar, TopNavbar } from "@/components/contentarea"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom";

export function CreateShipper() {
  const navigate = useNavigate(); // ⬅️ initialize navigate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // you can add your form logic here (API call, validation, etc.)
    navigate("/Shipper"); // ⬅️ redirect to shipper page
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />
          <div className="p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Manual Entry */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Create Shipper
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipper ID                    
                    </label>
                    <Input
                      placeholder="Enter Shipper ID"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipper Name
                    </label>
                    <Input
                      placeholder="Enter Shipper name"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipper Contact
                    </label>
                    <Input
                      placeholder="Enter Shipper number"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipper Address
                    </label>
                    <Input
                      placeholder="Enter full address"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipper Address
                    </label>
                    <Input
                      placeholder="Enter full address"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PickUp Address
                    </label>
                    <Input
                      placeholder="Enter PickUp Address"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Type
                    </label>
                    <div className="flex gap-2" >
                      <select className="rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300 px-3 py-2 bg-white text-sm">
                        <option value="COD">KBZ</option>
                        <option value="Prepaid">Banking</option>
                        <option value="Return">PrePaid</option>
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Note
                    </label>
                    <Input
                      placeholder="Any delivery notes"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"/>
                  </div>
                </div>
              </div>
                <Button className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg ml-213">
                Create
                </Button>
            </form>
          </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

