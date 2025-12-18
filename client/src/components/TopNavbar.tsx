import { Link, useLocation } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function TopNavbar() {
  const location = useLocation()

  const paths = location.pathname.split("/").filter(Boolean)

  return (
    <header className="h-14 border-b flex items-center px-4 bg-background mr-10 w-full">
      <div className="flex items-center flex-1">
        {/* Breadcrumbs only if path exists */}
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

      {/* Input always visible */}
      <input
        type="text"
        className="border p-1 rounded ml-4 mr-50 w-150"
        placeholder="Search..."
      />
    </header>
  )
}

