"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { alumni } from "@/lib/data/mock-data";
import { getInitials, getAvailabilityColor } from "@/lib/utils";

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [batchFilter, setBatchFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");
  const [domainFilter, setDomainFilter] = useState("All");

  const filteredAlumni = alumni.filter(alum => {
    // Search
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      alum.name.toLowerCase().includes(searchLower) ||
      alum.currentCompany.toLowerCase().includes(searchLower) ||
      alum.role.toLowerCase().includes(searchLower) ||
      alum.skills.some(skill => skill.toLowerCase().includes(searchLower));

    // Filters
    const matchesBatch = batchFilter === "All" || alum.graduationYear.toString() === batchFilter;
    const matchesBranch = branchFilter === "All" || alum.branch === branchFilter;
    const matchesDomain = domainFilter === "All" || alum.domain === domainFilter;

    return matchesSearch && matchesBatch && matchesBranch && matchesDomain;
  });

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#002855]">Alumni Directory</h1>
          <p className="text-gray-600 mt-2">Search and connect with NSUT alumni worldwide.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-12 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Search by name, company, role, or skills..." 
              className="pl-10 h-12 bg-gray-50 border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="md:col-span-3">
            <Select value={batchFilter} onValueChange={(v) => setBatchFilter(v || "All")}>
              <SelectTrigger className="h-10 bg-white">
                <SelectValue placeholder="Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Batches</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-3">
            <Select value={branchFilter} onValueChange={(v) => setBranchFilter(v || "All")}>
              <SelectTrigger className="h-10 bg-white">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Branches</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="EE">EE</SelectItem>
                <SelectItem value="ME">ME</SelectItem>
                <SelectItem value="ICE">ICE</SelectItem>
                <SelectItem value="BT">BT</SelectItem>
                <SelectItem value="MPAE">MPAE</SelectItem>
                <SelectItem value="MAC">MAC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-4">
            <Select value={domainFilter} onValueChange={(v) => setDomainFilter(v || "All")}>
              <SelectTrigger className="h-10 bg-white">
                <SelectValue placeholder="Domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Domains</SelectItem>
                <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                <SelectItem value="Data Science & AI/ML">Data Science & AI/ML</SelectItem>
                <SelectItem value="Core Engineering">Core Engineering</SelectItem>
                <SelectItem value="UPSC & Government">UPSC & Government</SelectItem>
                <SelectItem value="Research & Academia">Research & Academia</SelectItem>
                <SelectItem value="MBA & Management">MBA & Management</SelectItem>
                <SelectItem value="Finance & Quant">Finance & Quant</SelectItem>
                <SelectItem value="Product Management">Product Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Button 
              variant="outline" 
              className="w-full h-10 text-gray-600"
              onClick={() => {
                setSearchQuery("");
                setBatchFilter("All");
                setBranchFilter("All");
                setDomainFilter("All");
              }}
            >
              Clear
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500 font-medium">
          Showing {filteredAlumni.length} alumni
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alum) => (
          <Card key={alum.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
            <CardContent className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-transparent group-hover:border-blue-100 transition-colors">
                    <AvatarImage src={alum.avatar} />
                    <AvatarFallback className="bg-[#002855] text-white text-lg">
                      {getInitials(alum.name)}
                    </AvatarFallback>
                  </Avatar>
                  {alum.verificationStatus === "verified" && (
                    <CheckCircle2 className="w-5 h-5 text-blue-500 absolute bottom-0 right-0 bg-white rounded-full" />
                  )}
                </div>
                <Badge variant="outline" className={`capitalize ${getAvailabilityColor(alum.availability)} border shadow-none px-2 py-0.5 text-xs`}>
                  {alum.availability}
                </Badge>
              </div>
              
              <div className="mb-4 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{alum.name}</h3>
                <p className="text-sm font-semibold text-[#002855] mb-2">
                  {alum.branch} &apos;{alum.graduationYear}
                </p>
                <p className="text-gray-700 font-medium leading-snug mb-2">
                  {alum.role} at {alum.currentCompany}
                </p>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1 shrink-0" />
                  <span className="truncate">{alum.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  {alum.skills.slice(0, 3).map(skill => (
                    <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-600 font-normal hover:bg-gray-200 text-xs py-0">
                      {skill}
                    </Badge>
                  ))}
                  {alum.skills.length > 3 && (
                    <span className="text-xs text-gray-400 font-medium py-0.5 px-1">+{alum.skills.length - 3}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
                  <Link href={`/directory/${alum.id}`}>Profile</Link>
                </Button>
                <Button className="bg-[#002855] hover:bg-[#001f42] text-white" disabled={alum.availability !== "available"} asChild={alum.availability === "available"}>
                  {alum.availability === "available" ? (
                    <Link href={`/mentorship?mentor=${alum.id}`}>Connect</Link>
                  ) : (
                    <span>Busy</span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlumni.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-lg font-medium text-gray-900">No alumni found</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}
