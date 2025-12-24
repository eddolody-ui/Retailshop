import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar, TopNavbar } from "@/components/contentarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, User, Phone, MapPin, DollarSign, Calendar, FileText } from "lucide-react"
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
            // Already populated
            setShipper(orderData.shipperId as ShipperData & { _id: string })
          } else if (typeof orderData.shipperId === 'string') {
            // Need to fetch shipper data separately
            try {
              const shipperData = await getShipper(orderData.shipperId)
              setShipper(shipperData)
            } catch (shipperError) {
              console.error("Error fetching shipper:", shipperError)
              // Shipper not found, leave as null
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

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-4">
              <Link to="/Order">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Orders
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Order Details</h1>
                <p className="text-gray-600">Tracking ID: {order.TrackingId}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {order.Type}
            </Badge>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Order Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tracking ID</label>
                    <p className="text-lg font-semibold">{order.TrackingId || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type</label>
                    <p>{order.Type || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Amount</label>
                    <p className="text-xl font-bold text-green-600">
                      ${typeof order.Amount === 'number' ? order.Amount.toFixed(2) : '0.00'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-lg">{order.CustomerName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      Contact
                    </label>
                    <p>{order.CustomerContact || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Address
                    </label>
                    <p>{order.CustomerAddress || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Shipper Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Shipper Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {shipper ? (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Shipper ID</label>
                        <p className="text-lg font-semibold">{shipper.ShipperId || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Name</label>
                        <p>{shipper.ShipperName || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          Contact
                        </label>
                        <p>{shipper.ShipperContact || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          Address
                        </label>
                        <p>{shipper.ShipperAddress || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Pick Up Address</label>
                        <p>{shipper.PickUpAddress || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Billing Type</label>
                        <p>{shipper.BillingType || 'N/A'}</p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No shipper assigned to this order</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Assign Shipper
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Additional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Notes</label>
                    <p className="text-sm text-gray-700">
                      {order.Note || "No additional notes"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Created
                    </label>
                    <p className="text-sm">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <Button variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                Process Payment
              </Button>
              <Button variant="outline">
                Print Invoice
              </Button>
              <Button variant="outline">
                Update Status
              </Button>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}