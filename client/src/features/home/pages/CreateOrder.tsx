import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AppSidebar, TopNavbar } from "@/components/contentarea"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createOrder, getShippers, type ShipperData } from "@/api/serviceApi";
import { useParams } from "react-router-dom"

/**
 * CreateOrderForm Component
 * 
 * ဤအရာသည် အသစ်စက်စက် order များဖန်တီးရန် အဓိက component ဖြစ်သည်။ ၎င်းသည် form state ကို စီမံခန့်ခွဲပြီး၊
 * user input ကို handle လုပ်ပြီး order data ကို backend API သို့ submit လုပ်သည်။
 * 
 * Relationships:
 * - handleSubmit ကို အသုံးပြု၍ form submission ကို process လုပ်ပြီး createOrder API ကို call လုပ်သည်
 * - handleChange ကို အသုံးပြု၍ user input တွင် formData state ကို update လုပ်သည်
 * - Submit လုပ်ပြီးနောက် Order page သို့ navigate လုပ်သည်
 * - UI layout တစ်သမတ်ဖြစ်စေရန် AppSidebar နှင့် TopNavbar များနှင့် integrate လုပ်သည်
 */
export function CreateOrderForm() {
  // Navigation hook for redirecting after form submission
  const navigate = useNavigate();
  
  // Loading state to disable form during API call
  const [loading, setLoading] = useState(false);
  // Error state for feedback
  const [error, setError] = useState<string | null>(null);

  // Shippers state for dropdown
  const [shippers, setShippers] = useState<(ShipperData & { _id: string })[]>([]);

  // Fetch shippers on component mount
  useEffect(() => {
    const fetchShippers = async () => {
      try {
        const shippersData = await getShippers();
        setShippers(shippersData);
      } catch (error) {
        console.error("Error fetching shippers:", error);
      }
    };
    fetchShippers();
  }, []);

  const { shipperId } = useParams();
  // Form data state - holds all input values
  const [formData, setFormData] = useState({
    TrackingId: "",
    CustomerName: "",
    CustomerContact: "",
    CustomerAddress: "",
    Amount: 0,
    Type: "COD",
    Note: "",
    Status: "Pending",
    shipperId: shipperId || ""
  });

  useEffect(() => {
    if (!shipperId) return;
    setFormData((prev) => ({
      ...prev,
      shipperId,
    }))
  }, [shipperId])

  /**
   * handleSubmit Function
   * 
   * Form submission event ကို handle လုပ်သည်။ Default form behavior ကို prevent လုပ်ပြီး၊
   * order data ကို createOrder API မှတစ်ဆင့် backend သို့ send လုပ်ပြီး၊
   * success ဖြစ်ပါက Order page သို့ navigate လုပ်သည်။
   * 
   * Relationships:
   * - Form submit လုပ်သောအခါ (onSubmit event) တွင် call လုပ်သည်
   * - Input အဖြစ် handleChange မှ manage လုပ်သော formData state ကို အသုံးပြုသည်
   * - Data ကို persist လုပ်ရန် createOrder API function ကို call လုပ်သည်
   * - Async operation အတွင်း loading state ကို update လုပ်သည်
   * - Success ဖြစ်ပါက redirect လုပ်ရန် navigate hook ကို အသုံးပြုသည်
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Ensure Status is set to 'Pending' if not selected
    if (!formData.shipperId) {
      setError("shipperId is required. Cannot create order.");
      setLoading(false);
      return;
    }
    const submitData = {
      ...formData,
      Status: formData.Status || 'Pending',
    };
    try {
      await createOrder(submitData);
      navigate("/Shipper"); // ⬅️ redirect to order page 
    } catch (error: any) {
      setError(error?.response?.data?.message || "Error creating order");
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };
  /**
   * handleChange Function
   * 
   * User က input တွင် type လုပ်သောအခါ သို့မဟုတ် option များကို select လုပ်သောအခါ formData state ကို update လုပ်သည်။
   * Amount field အတွက် text input နှင့် number conversion ကို handle လုပ်သည်။
   * 
   * Relationships:
   * - လုပ်ငန်းသုံး input အားလုံးတွင် onChange event တွင် call လုပ်သည်
   * - handleSubmit မှ အသုံးပြုသော formData state ကို update လုပ်သည်
   * - Proper data handling အတွက် Amount ကို number type သို့ convert လုပ်သည်
   * - Previous state ကို spread လုပ်ခြင်းဖြင့် immutability ကို maintain လုပ်သည်
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({  
      ...prevData,
      [name]: name === "Amount" ? Number(value) : value, // Convert Amount to number
    }));
  } 
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
                {error && (
                  <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded p-2">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tracking ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tracking ID                    
                    </label>
                    <Input
                      onChange={handleChange}
                      name="TrackingId"
                      value={formData.TrackingId}
                      placeholder="Enter Tracking ID"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {/* Customer Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name
                    </label>
                    <Input
                      onChange={handleChange}
                      value={formData.CustomerName}
                      name="CustomerName"
                      placeholder="Enter Customer name"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {/* Customer Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Contact
                    </label>
                    <Input
                      onChange={handleChange}
                      value={formData.CustomerContact}
                      name="CustomerContact"
                      placeholder="Enter Customer number"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {/* Customer Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Address
                    </label>
                    <Input
                      onChange={handleChange}
                      value={formData.CustomerAddress}
                      name="CustomerAddress"
                      placeholder="Enter full address"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 ">
                      Amount
                    </label>
                    <Input
                      onChange={handleChange}
                      value={formData.Amount}
                      name="Amount"
                      placeholder="Enter Amount"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      type="number"
                      min={0}
                    />
                  </div>
                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <div className="flex gap-2" >
                      <select onChange={handleChange} value={formData.Type} className="rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300 px-3 py-2 bg-white text-sm" name="Type" required>
                        <option value="COD">COD</option>
                        <option value="Prepaid">Prepaid</option>
                        <option value="Return">Return</option>
                      </select>
                    </div>
                  </div>
                  {/* Note */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Note
                    </label>
                    <Input
                      onChange={handleChange}
                      value={formData.Note}
                      placeholder="Any delivery notes"
                      className="rounded-lg focus:ring-2 focus:ring-blue-500"
                      name="Note"
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
                    disabled={loading}
                    />
                    <Button type="submit" disabled={loading} className="px-6 py-2 rounded-lg ml-133 bg-blue-600 hover:bg-blue-500 text-white">
                      {loading ? "Creating..." : "Create Order"}
                    </Button>                
                  </div>
                </div>
            </form>
          </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
