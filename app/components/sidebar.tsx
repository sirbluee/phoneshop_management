"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Smartphone, Package, ShoppingCart, Users, FileText, Settings } from 'lucide-react'

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Products", href: "/products", icon: Smartphone },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Phone Shop</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              pathname === item.href ? "bg-gray-100" : ""
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

