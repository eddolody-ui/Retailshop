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
import { Link, useLocation } from "react-router-dom"
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
  
  { title: "Order",
    icon: FiShoppingCart,
    children: [
      { title: "Order", url:"/Order", icon: Users },
      { title: "Security", url: "/security", icon: Lock },
    ],
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

      {/* SEARCH */}
      <input
        type="text"
        className="p-1.5 px-4 rounded-full border shadow-inner w-56 mr-4"
        placeholder="Search..."
      />

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
export default function DashboardPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <StatusCard
        title="Total Orders"
        value={1245}
        trend="up"
        trendValue="12% today"
        icon={<FiShoppingCart className="h-5 w-5" />}
        />

    <StatusCard
        title="Revenue"
        value="$8,540"
        trend="up"
        trendValue="8% this month"
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
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getOrders, type OrderData } from "@/api/serviceApi"

export type Order = OrderData & { _id: string; createdAt: string; updatedAt: string };
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "TrackingId",
    header: () => <div className="ml-9">Tracking ID</div>,
    cell: ({ row }) => (
      <div className="capitalize ml-10">{row.getValue("TrackingId")}</div>
    ),
  },
  {
    accessorKey: "CustomerName",
    header: () => <div>Customer Name</div>,
    cell: ({ row }) => (
      <div className="capitalize ml-3">{row.getValue("CustomerName")}</div>
    ),
  },
  {
    accessorKey: "CustomerContact",
    header: () => <div>Contact</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("CustomerContact")}</div>
    ),
  },
  {
    accessorKey: "CustomerAddress",
    header: () => <div>Address</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("CustomerAddress")}</div>
    ),
  },
  {
    accessorKey: "Type",
    header: () => <div>Type</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Type")}</div>
    ),
  },
  {
    accessorKey: "Amount",
    header: () => <div className="text-right mr-10">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium mr-10">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="ml-3">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt")).toLocaleDateString();
      return <div className="capitalize">{date}</div>
    },
  },
]

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
export function DataTableDemo() {
  const [data, setData] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        setData(orders as Order[]);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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
    return <div className="p-4">Loading orders...</div>;
  }

  return (
    //Search-Bar//
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by Tracking ID..."
          value={(table.getColumn("TrackingId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("TrackingId")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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