import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar, TopNavbar } from "@/components/contentarea"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getOrder, getShipper, type OrderData, type ShipperData } from "@/api/serviceApi"

export function OrderDetail() {
  const { trackingId } = useParams<{ trackingId: string }>()
  const [order, setOrder] = useState<(OrderData & { _id: string; createdAt: string; updatedAt: string }) | null>(null)
  const [shipper, setShipper] = useState<(ShipperData & { _id: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!trackingId) {
        setError("No tracking ID provided")
        setLoading(false)
        return
      }

      try {
        const orderData = await getOrder(trackingId)
        setOrder(orderData)

        // Handle shipper data - either populated object or string reference
        if (orderData.shipperId) {
          if (typeof orderData.shipperId === 'object' && orderData.shipperId !== null) {
            setShipper(orderData.shipperId as ShipperData & { _id: string })
          } else if (typeof orderData.shipperId === 'string') {
            try {
              const shipperData = await getShipper(orderData.shipperId)
              setShipper(shipperData)
            } catch (shipperError) {
              console.error("Error fetching shipper:", shipperError)
            }
          }
        }
      } catch (err: any) {
        console.error("Error fetching order:", err)
        if (err.response?.status === 404) {
          setError("Order not found")
        } else if (err.response?.status >= 500) {
          setError("Server error. Please try again later.")
        } else if (err.code === 'NETWORK_ERROR' || !err.response) {
          setError("Network error. Please check your connection.")
        } else {
          setError("Failed to load order details")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [trackingId])

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col w-full">
            <TopNavbar />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading order details...</p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  if (error) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col w-full">
            <TopNavbar />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-red-600 mb-4 text-lg">{error}</div>
                <Link to="/Order">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Orders
                  </Button>
                </Link>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  if (!order) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col w-full">
            <TopNavbar />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Order not found</p>
                <Link to="/Order">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Orders
                  </Button>
                </Link>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col w-full">
          <TopNavbar />

          {/* Centered card matching mock: left info | center status + timeline | right actions */}
          <div className="flex-1">
            <div className="max-w-5xl mx-auto overflow-hidden">
              <div className="grid grid-cols-12">
                {/* Left column: customer & seller info (3/12) */}
                <div className="col-span-12 md:col-span-3 border-r px-6 py-8">
                  <div className="mb-6">
                    <div className="text-xs text-gray-400">Customer Name</div>
                    <div className="mt-1 font-medium">{order.CustomerName || '—'}</div>
                  </div>
                  <div className="mb-6">
                    <div className="text-xs text-gray-400">Customer Contact</div>
                    <div className="mt-1 text-sm text-gray-700">{order.CustomerContact || '—'}</div>
                  </div>
                  <div className="mb-6">
                    <div className="text-xs text-gray-400">Delivery Address</div>
                    <div className="mt-1 text-sm text-gray-700">{order.CustomerAddress || '—'}</div>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <div className="text-xs text-gray-400">Seller</div>
                    <div className="mt-1 text-sm">{(shipper as any).ShipperName || 'N/A'}</div>
                    <div className="text-xs text-gray-400 mt-3">Seller Contact</div>
                    <div className="text-sm">{(shipper as any).ShipperContact || '—'}</div>
                  </div>
                </div>

                {/* Middle column: tracking & status (6/12) */}
                <div className="col-span-12 md:col-span-6 px-8 py-8">
                  <div className="flex items-start justify-between">
                    <div className="flex justify-end gap-130">
                      <div className="font-semibold text-gray-800 mt-1.5">#{order.TrackingId}</div>
                      <Button variant="ghost" className="rounded border">Update Status</Button>
                    </div>
                    <div className="mt-2 flex flex-col gap-2 bg-gray-100 rounded-md">
                    
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm text-gray-400">your order is</div>
                    <div className="mt-2 text-4xl font-extrabold text-gray-900">{order.Status || 'Unknown'}</div>
                    <div className="mt-2 text-sm text-gray-500">{order.Status === 'Delivered' && order.updatedAt ? `as on ${new Date(order.updatedAt).toLocaleDateString()}` : ''}</div>
                    <div className="mt-2 text-xs text-gray-400">Last updated on {order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : '—'}</div>
                  </div>

                  {/* Tracking History / Timeline */}
                  <div className="mt-8">
                    <div className="text-sm font-medium mb-4">Tracking History</div>
                    <div className="relative">
                      {/* vertical line */}
                      <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200"></div>
                      <ul className="space-y-6 pl-12">
                        {(() => {
                          const logs = (order as any).Logs || (order as any).logs || []
                          if (!logs || logs.length === 0) {
                            return <li className="text-sm text-gray-500">No tracking events available.</li>
                          }
                          return (logs.slice().reverse().map((entry: any, idx: number) => (
                            <li key={idx} className="relative">
                              <div className="absolute -left-9 top-0 h-3 w-3 rounded-full bg-white border-2 border-blue-600"></div>
                              <div className="text-sm font-medium">{entry.message || entry.event || 'Event'}</div>
                              <div className="text-xs text-gray-400 mt-1">{entry.timestamp ? new Date(entry.timestamp).toLocaleString() : (entry.time ? new Date(entry.time).toLocaleString() : '')}</div>
                            </li>
                            
                          )))
                        })()}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}