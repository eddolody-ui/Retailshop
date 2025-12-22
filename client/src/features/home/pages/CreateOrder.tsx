import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AppSidebar, TopNavbar } from "@/components/contentarea"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom";

export function CreateOrderForm() {
  const navigate = useNavigate(); // ⬅️ initialize navigate
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // you can add your form logic here (API call, validation, etc.)
    navigate("/Order"); // ⬅️ redirect to shipper page
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
                  Create Order
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tracking ID                    
                    </label>
                    <Input
                      placeholder="Enter Tracking ID"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name
                    </label>
                    <Input
                      placeholder="Enter Customer name"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Contact
                    </label>
                    <Input
                      placeholder="Enter Customer number"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Address
                    </label>
                    <Input
                      placeholder="Enter full address"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 ">
                      Amount
                    </label>
                    <Input
                      placeholder="Enter Amount"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <div className="flex gap-2" >
                      <select className="rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300 px-3 py-2 bg-white text-sm">
                        <option value="COD">COD</option>
                        <option value="Prepaid">Prepaid</option>
                        <option value="Return">Return</option>
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Note
                    </label>
                    <Input
                      placeholder="Any delivery notes"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              {/* Excel Upload */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                     Bulk Upload via Excel
                </h2>
                {/* Input + Button တစ်တန်းထဲ */}
                <div className="flex items-center gap-4">
                    <input
                    type="file"
                    accept=".xlsx,.csv"
                    className="text-sm text-gray-600 
                    file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                    file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 
                     hover:file:bg-blue-100"
                    />
                    <Button className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg ml-140">
                    Create
                    </Button>
                </div>
            </div>
            </form>
          </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
