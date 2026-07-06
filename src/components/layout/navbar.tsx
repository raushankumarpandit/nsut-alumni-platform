"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, User, LayoutDashboard, ShieldAlert, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn, getInitials } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";

const NAV_LINKS = [
  { name: "Directory", href: "/directory" },
  { name: "Mentorship", href: "/mentorship" },
  { name: "Forum", href: "/forum" },
  { name: "Opportunities", href: "/opportunities" },
  { name: "Events", href: "/events" },
  { name: "Stories", href: "/stories" },
  { name: "Resources", href: "/resources" },
  { name: "Network", href: "/network" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center gap-2 mb-8 mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/NSUT_logo.png" alt="NSUT Logo" className="h-8 w-8 object-contain" />
                <span className="text-xl font-bold text-[#002855]">NSUT <span className="font-normal text-gray-600">Alumni</span></span>
              </div>
              <nav className="grid gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-[#002855]",
                        isActive ? "bg-gray-50 text-[#002855]" : "text-gray-700"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/NSUT_logo.png" alt="NSUT Logo" className="h-8 w-8 object-contain hidden sm:block" />
            <span className="text-xl font-bold text-[#002855]">
              NSUT <span className="font-normal text-gray-600 hidden sm:inline-block">Alumni Network</span>
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#002855]",
                  isActive ? "text-[#002855] border-b-2 border-[#002855] pb-5 pt-5" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          {!loading && (
            <>
              {user ? (
                <>
                  <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-gray-600 hover:text-[#002855]">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-600 hover:text-[#002855]">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 rounded-full transition-transform duration-150 active:scale-90">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-[#002855] text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <div className="flex flex-col space-y-1 p-2">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer flex items-center">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="cursor-pointer flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      {user.role === "admin" && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="cursor-pointer flex items-center">
                            <ShieldAlert className="mr-2 h-4 w-4" />
                            <span>Admin Panel</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => logout()}
                        className="cursor-pointer flex items-center text-red-600 focus:text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-[#002855] transition-all duration-150 active:scale-95 px-2 py-1">
                    Sign In
                  </Link>
                  <Button className="bg-[#002855] hover:bg-[#001f42] text-white h-9 px-4 rounded-md text-sm font-semibold transition-transform duration-150 active:scale-[0.97]" asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
