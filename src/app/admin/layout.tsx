"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, ShieldAlert, BarChart3, 
  Settings, ArrowLeft
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

const ADMIN_LINKS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Moderation", href: "/admin/moderation", icon: ShieldAlert },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 bg-white border-r border-gray-200 hidden md:block py-8 px-4">
          <div className="mb-6 px-2">
            <h2 className="text-sm font-bold tracking-wider text-gray-500 uppercase">Admin Portal</h2>
          </div>
          <nav className="space-y-1">
            {ADMIN_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-blue-50 text-[#002855]" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-8 pt-8 border-t border-gray-100 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Exit Admin
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Settings className="h-5 w-5" />
              Platform Settings
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
