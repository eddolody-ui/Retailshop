//Icon Import//
import { FiAirplay } from "react-icons/fi";
import { StatusCard } from "@/components/ui/card"
import { FiShoppingCart } from "react-icons/fi";
import { CgTrending } from "react-icons/cg";
import { Users, Lock, Settings } from "lucide-react"
import { IoCarSport } from "react-icons/io5";
//Sidebar import //
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
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
//Top-Directory-Link import//
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
//Top-Right-AvaterIcon import//
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
//Section-For-SideBar//
type MenuItem = {
  title: string
  url?: string
  icon: React.FC<any>
  children?: MenuItem[]
}
const items: MenuItem[] = [
  { title: "Dashboard", url: "/", 
    icon: FiAirplay },
  
  { title: "Order", url:"/Order",
    icon: FiShoppingCart,
  },

 { title: "Shipper",
   icon: Settings,
   children: [
     { title: "Shipper", url: "/Shipper", icon: Users },
     { title: "CreateShipper", url: "/Shipper/CreateShipper", icon: Lock },
   ],
 },
]
//Section-For-Sidebar//

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
    <span className="group-data-[collapsible=icon]:hidden font-semibold ml-  ">
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
                      className={`ml-auto mr-5 h-4 w-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden ${
                        openDropdowns[item.title] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (

                  <Link to={item.url!} className="flex items-center gap-2">
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
                  </Link>
                )}
              </SidebarMenuButton>

              {/* Dropdown list */}
              {item.children && openDropdowns[item.title] && (
                <ul className="ml-8 pt-3">
                  {item.children.map((child) => (
                    <li key={child.title} className=" font-light mb-3">
                      <SidebarMenuSubItem>
                        <Link to={child.url!} className="flex items-center gap-2">
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
                        </Link>
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
//Section-For-TopNavBar//
export function TopNavbar() {
  const location = useLocation()
  const paths = location.pathname.split("/").filter(Boolean)
  // useSearchParams is used by the TopNavSearch component below
  return (
    <header className="h-14 border-b flex items-center px-4 bg-background w-full">
      {/* LEFT */}
      <div className="flex items-center flex-1 gap-4">
        {paths.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {paths.map((segment, index) => {
                const href = "/" + paths.slice(0, index + 1).join("/")
                const isLast = index === paths.length - 1
                const label =
                  segment.charAt(0).toUpperCase() + segment.slice(1)

                return (
                  <BreadcrumbItem key={href}>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={href}>{label}</Link>
                      </BreadcrumbLink>
                    )}
                    {!isLast && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      {/* SEARCH (writes `q` query param) */}
      <TopNavSearch />

      {/* PROFILE DROPDOWN (RIGHT) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-1 rounded-full border">
            <Avatar className="">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>MT</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-red-600">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}


//Section-For-DashboardCards//
export default function Dashboard() {
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const orders = await getOrders();
        setTotalOrders(orders.length);
        const pendingOrders = orders.filter(order => order.Status === 'Pending');
        setPendingCount(pendingOrders.length);
      } catch (error) {
        console.error("Failed to fetch order stats:", error);
        // Set default values if API fails
        setTotalOrders(0);
        setPendingCount(0);
      }
    };
    fetchOrderStats();
  }, []);
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <StatusCard
        title="Total Orders"
        value={totalOrders.toString()}
        icon={<FiShoppingCart className="h-5 w-5" />}
        />

    <StatusCard
        title="Pending"
        value={pendingCount.toString()}
        icon={<CgTrending className="h-5 w-5"/>}
    />

    <StatusCard
        title="Customers"
        value={320}
        trend="down"
        trendValue="3% this week"
        icon={<Users className="h-5 w-5" />}
        />

    <StatusCard
        title="Shipment"
        value={628}
        trend="up"
        trendValue="70% this month"
        icon={<IoCarSport className="h-5 w-5" />}
        />
    </div>
  )
}

export  function EachShipperData({ shipperId }: { shipperId?: string } = {}) {
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const orders = await getOrders();
        
        // Filter orders by shipper if shipperId is provided
        let filteredOrders = orders;
        if (shipperId) {
          filteredOrders = orders.filter(order => {
            if (typeof order.shipperId === 'string') {
              return order.shipperId === shipperId;
            } else if (typeof order.shipperId === 'object' && order.shipperId) {
              const shipperObj = order.shipperId as { ShipperId?: string; _id?: string };
              return shipperObj.ShipperId === shipperId || shipperObj._id === shipperId;
            }
            return false;
          });
        }
        
        setTotalOrders(filteredOrders.length);
        const pendingOrders = filteredOrders.filter(order => order.Status === 'Pending');
        setPendingCount(pendingOrders.length);
      } catch (error) {
        console.error("Failed to fetch order stats:", error);
        // Set default values if API fails
        setTotalOrders(0);
        setPendingCount(0);
      }
    };
    fetchOrderStats();
  }, [shipperId]);
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <StatusCard
        title="Total Orders"
        value={totalOrders.toString()}
        icon={<FiShoppingCart className="h-5 w-5" />}
        />

    <StatusCard
        title="Pending"
        value={pendingCount.toString()}
        icon={<CgTrending className="h-5 w-5"/>}
    />

    <StatusCard
        title="Customers"
        value={320}
        trend="down"
        trendValue="3% this week"
        icon={<Users className="h-5 w-5" />}
        />

    <StatusCard
        title="Shipment"
        value={628}
        trend="up"
        trendValue="70% this month"
        icon={<IoCarSport className="h-5 w-5" />}
        />
    </div>
  )
}


//Section-For-DataTable//
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getOrders, getShippers, type OrderData, type ShipperData } from "@/api/serviceApi"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react";

export type Order = OrderData & { _id: string; createdAt: string; updatedAt: string };
export type Shipper = ShipperData & { _id: string; createdAt: string; updatedAt: string };
export const shipperColumns: ColumnDef<Shipper>[] = [
  {
    accessorKey: "ShipperId",
    header: () => <div className="flex justify-center">Shipper ID</div>,
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">{row.getValue("ShipperId")}</div>
    ),
  },
  {
    accessorKey: "ShipperName",
    header: () => <div className="flex justify-center">Shipper Name</div>,
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">{row.getValue("ShipperName")}</div>
    ),
  },
  {
    accessorKey: "ShipperContact",
    header: () => <div className="flex justify-center">Contact</div>,
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">{row.getValue("ShipperContact")}</div>
    ),
  },
  {
    accessorKey: "ShipperAddress",
    header: () => <div className="flex justify-center">Address</div>,
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">{row.getValue("ShipperAddress")}</div>
    ),
  },
  {
    accessorKey: "PickUpAddress",
    header: () => <div className="flex justify-center">Pick Up Address</div>,
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">{row.getValue("PickUpAddress")}</div>
    ),
  },
  {
    accessorKey: "BillingType",
    header: () => <div className="flex justify-center">Billing Type</div>,
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">{row.getValue("BillingType")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="flex justify-center">Date Created</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt")).toLocaleDateString();
      return <div className="capitalize flex justify-center">{date}</div>
    },
  },
]

export const columns: ColumnDef<Order>[] = [
    {
    accessorKey: "shipperId",
    header: () => <div className="flex justify-center">Shipper</div>,
    cell: ({ row }) => {
      const shipperId = row.getValue("shipperId") as any;
      if (shipperId && typeof shipperId === 'object' && shipperId.ShipperName) {
        return <div className="capitalize flex justify-center">{shipperId.ShipperName}</div>
      }
      return <div className="text-gray-500">Not assigned</div>
    },
  },
  {
    accessorKey: "TrackingId",
    header: () => <div className="flex justify-center">Tracking ID</div>,
    cell: ({ row }) => (
      <div className="capitalize justify-center flex">{row.getValue("TrackingId")}</div>
    ),
  },
  {
    accessorKey: "CustomerName",
    header: () => <div className="flex justify-center">Customer Name</div>,
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">{row.getValue("CustomerName")}</div>
    ),
  },
  {
    accessorKey: "CustomerContact",
    header: () => <div className="flex justify-center">Contact</div>,
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">{row.getValue("CustomerContact")}</div>
    ),
  },
  {
    accessorKey: "CustomerAddress",
    header: () => <div className="flex justify-center">Address</div>,
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">{row.getValue("CustomerAddress")}</div>
    ),
  },
  {
    accessorKey: "Type",
    header: () => <div className="flex justify-center">Type</div>,
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">{row.getValue("Type")}</div>
    ),
  },
  {
    accessorKey: "Amount",
    header: () => <div className="flex justify-center">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="flex justify-center">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="flex justify-center">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt")).toLocaleDateString();
      return <div className="capitalize flex justify-center">{date}</div>
    },
  },
]

/**
 * TableSkeleton Component
 * 
 * Modern loading animation for tables using skeleton placeholders
 */
function TableSkeleton({ columns }: { columns: number }) {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/**
 * DataTableDemo Component
 * 
 * Order data ကို sortable၊ filterable table တွင် search functionality ဖြင့် display လုပ်သည်။
 * Backend API မှ order data ကို fetch လုပ်ပြီး TanStack Table ကို အသုံးပြု၍ render လုပ်သည်။
 * 
 * Relationships:
 * - Order list ကို display လုပ်ရန် Order page component မှ အသုံးပြုသည်
 * - Backend မှ data fetch လုပ်ရန် getOrders() API function ကို call လုပ်သည်
 * - MongoDB fields များဖြင့် OrderData ကို extend လုပ်သော Order type ကို အသုံးပြုသည်
 * - GET /api/orders endpoint မှ data ကို render လုပ်သည်
 * - TrackingId ဖြင့် search functionality ကို provide လုပ်သည်
 * - Data fetch အတွင်း loading state ကို show လုပ်သည်
 * - Data array ဗလာဖြစ်သောအခါ "No orders found" ကို display လုပ်သည်
 */

export function OrderDataTable({ orders }: { orders?: Order[] } = {}) {
  const navigate = useNavigate()
  const [data, setData] = React.useState<Order[]>([]);
  const [allData, setAllData] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(!orders);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(() => {
    if (orders) {
      // If orders are provided as props, use them directly
      setData(orders);
      setAllData(orders);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        // fetch shippers and build map to merge shipper info into orders
        let shippers: Shipper[] = []
        try {
          shippers = await getShippers() as Shipper[]
        } catch (err) {
          // if shippers endpoint fails, continue with orders only
          console.warn('Failed to fetch shippers for merge:', err)
        }

        const shipperById = new Map<string, Shipper>()
        for (const s of shippers) {
          // support both ShipperId and _id keys
          if ((s as any).ShipperId) shipperById.set((s as any).ShipperId.toString(), s)
          if (s._id) shipperById.set(s._id.toString(), s)
        }

        const merged = (orders as Order[]).map((o) => {
          const copy = { ...o } as any
          // if shipperId is string, try to map to shipper
          if (copy.shipperId && typeof copy.shipperId === 'string') {
            const s = shipperById.get(copy.shipperId)
            if (s) copy.shipper = s
          } else if (copy.shipperId && typeof copy.shipperId === 'object') {
            copy.shipper = copy.shipperId
          }
          // expose shipperName and shipperIdentifier for easy search
          copy.shipperName = (copy.shipper && (copy.shipper.ShipperName || copy.shipper.ShipperName)) || ''
          copy.shipperIdentifier = (copy.shipper && ((copy.shipper.ShipperId) || (copy.shipper._id))) || ''
          return copy as Order
        })

        setData(merged as Order[]);
        setAllData(merged as Order[]);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // read query param `q` from URL and filter client-side
  const [searchParams] = useSearchParams();
  React.useEffect(() => {
    const q = (searchParams.get('q') || '').trim().toLowerCase()
    if (!q) {
      setData(allData)
      return
    }

    const filtered = allData.filter((o) => {
      const tracking = (o.TrackingId || '').toString().toLowerCase()
      const orderId = (o._id || '').toString().toLowerCase()
      const customer = (o.CustomerName || '').toString().toLowerCase()
      const shipperName = (((o as any).shipperName) || ((o as any).shipper && ((o as any).shipper.ShipperName || ''))) .toString().toLowerCase()
      const shipperId = (((o as any).shipperIdentifier) || ((o as any).shipper && ((o as any).shipper.ShipperId || (o as any).shipper._id) || '')).toString().toLowerCase()

      return (
        tracking.includes(q) ||
        orderId.includes(q) ||
        customer.includes(q) ||
        shipperName.includes(q) ||
        shipperId.includes(q)
      )
    })

    setData(filtered)
  }, [searchParams, allData])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (loading) {
    return <TableSkeleton columns={columns.length} />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* Search is handled by the top navbar (q query param) */}
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/Order/${row.original.TrackingId}`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/**
 * ShipperDataTable Component
 * 
 * Shipper data ကို sortable၊ filterable table တွင် search functionality ဖြင့် display လုပ်သည်။
 * Backend API မှ shipper data ကို fetch လုပ်ပြီး TanStack Table ကို အသုံးပြု၍ render လုပ်သည်။
 * 
 * Relationships:
 * - Shipper list ကို display လုပ်ရန် Shipper page component မှ အသုံးပြုသည်
 * - Backend မှ data fetch လုပ်ရန် getShippers() API function ကို call လုပ်သည်
 * - MongoDB fields များဖြင့် ShipperData ကို extend လုပ်သော Shipper type ကို အသုံးပြုသည်
 * - GET /api/shippers endpoint မှ data ကို render လုပ်သည်
 * - ShipperId ဖြင့် search functionality ကို provide လုပ်သည်
 * - Data fetch အတွင်း loading state ကို show လုပ်သည်
 * - Data array ဗလာဖြစ်သောအခါ "No shippers found" ကို display လုပ်သည်
 */
export function ShipperDataTable() {
  const navigate = useNavigate()
  const [data, setData] = React.useState<Shipper[]>([]);
  const [allData, setAllData] = React.useState<Shipper[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "ShipperName",
      desc: false,
    },
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  React.useEffect(() => {
    const fetchShipper = async () => {
      try {
        // fetch shippers and build map to merge shipper info into orders
        let shipper: Shipper[] = []
        try {
          shipper = await getShippers() as Shipper[]
        } catch (err) {
          // if shippers endpoint fails, continue with orders only
          console.warn('Failed to fetch shippers for merge:', err)
        }

        const shipperById = new Map<string, Shipper>()
        for (const s of shipper) {
          // support both ShipperId and _id keys
          if ((s as any).ShipperId) shipperById.set((s as any).ShipperId.toString(), s)
          if (s._id) shipperById.set(s._id.toString(), s)
        }

        const merged = (shipper as Shipper[]).map((o) => {
          const copy = { ...o } as any
          // if shipperId is string, try to map to shipper
          if (copy.shipperId && typeof copy.shipperId === 'string') {
            const s = shipperById.get(copy.shipperId)
            if (s) copy.shipper = s
          } else if (copy.shipperId && typeof copy.shipperId === 'object') {
            copy.shipper = copy.shipperId
          }
          // expose shipperName and shipperIdentifier for easy search
          copy.shipperName = (copy.shipper && (copy.shipper.ShipperName || copy.shipper.ShipperName)) || ''
          copy.shipperIdentifier = (copy.shipper && ((copy.shipper.ShipperId) || (copy.shipper._id))) || ''
          return copy as Shipper
        })

        setData(merged as Shipper[]);
        setAllData(merged as Shipper[]);
      } catch (error) {
        console.error("Failed to fetch Shipper:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipper();
  }, []);

  // read query param `q` from URL and filter client-side
    const [searchParams] = useSearchParams();
  React.useEffect(() => {
    const q = (searchParams.get('q') || '').trim().toLowerCase()
    if (!q) {
      setData(allData)
      return
    }

    const filtered = allData.filter((o) => {
      const ShipperId = String(o.ShipperId || '').toString().toLowerCase()
      const shipperName = String(o.ShipperName || '').toString().toLowerCase()
      return (
        shipperName.includes(q) ||
        ShipperId.includes(q)
      )
    })

    setData(filtered)
  }, [searchParams, allData])


  const table = useReactTable({
    data,
    columns: shipperColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (loading) {
    return <TableSkeleton columns={shipperColumns.length} />;
  }

  return (
    //Search-Bar//
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/Shipper/${row.original.ShipperId || row.original._id}`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={shipperColumns.length}
                  className="h-24 text-center"
                >
                  No shippers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// Top-nav search component: updates `q` query param
function TopNavSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val) {
      setSearchParams({ q: val })
    } else {
      setSearchParams({})
    }
  }

  return (
    <input
      type="text"
      className="p-1.5 px-4 rounded-full border shadow-inner w-56 mr-4"
      placeholder="Search..."
      value={q}
      onChange={onChange}
    />
  )
}