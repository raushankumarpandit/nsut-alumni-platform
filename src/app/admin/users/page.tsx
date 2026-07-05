"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { alumni } from "@/lib/data/mock-data";
import { getInitials } from "@/lib/utils";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(alumni); // Local state to allow toggling verification

  const toggleVerification = (id: string) => {
    setUsers(users.map(u => 
      u.id === id 
        ? { ...u, verificationStatus: u.verificationStatus === "verified" ? "pending" : "verified" }
        : u
    ));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.currentCompany.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#002855]">User Management</h1>
        <p className="text-gray-600 mt-1">Manage alumni verification and platform access.</p>
      </div>

      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search users..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
            </div>
          </div>

          <div className="border rounded-md divide-y divide-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-5 sm:col-span-4">User</div>
              <div className="col-span-3 hidden sm:block">Role/Company</div>
              <div className="col-span-3 sm:col-span-2">Status</div>
              <div className="col-span-4 sm:col-span-3 text-right">Actions</div>
            </div>

            {/* Table Body */}
            {filteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.branch} &apos;{user.graduationYear}</p>
                  </div>
                </div>
                
                <div className="col-span-3 hidden sm:block min-w-0">
                  <p className="text-sm text-gray-700 truncate">{user.role}</p>
                  <p className="text-xs text-gray-500 truncate">@ {user.currentCompany}</p>
                </div>
                
                <div className="col-span-3 sm:col-span-2">
                  {user.verificationStatus === "verified" ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 shadow-none text-[10px] px-2 py-0.5">
                      <CheckCircle2 className="w-3 h-3 mr-1 inline" /> Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 shadow-none text-[10px] px-2 py-0.5">
                      <Clock className="w-3 h-3 mr-1 inline" /> Pending
                    </Badge>
                  )}
                </div>
                
                <div className="col-span-4 sm:col-span-3 flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs h-8 hidden sm:inline-flex"
                    onClick={() => toggleVerification(user.id)}
                  >
                    {user.verificationStatus === "verified" ? "Revoke" : "Verify"}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No users found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
