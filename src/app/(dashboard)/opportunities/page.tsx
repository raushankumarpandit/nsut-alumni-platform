"use client";

import { useState } from "react";
import { 
  Briefcase, MapPin, Building2, Clock, 
  ExternalLink, Users, Search, Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { opportunities } from "@/lib/data/mock-data";
import { getInitials, formatRelativeTime } from "@/lib/utils";

const TYPES = ["All", "Internship", "Full-time Job", "Referral", "Research", "Startup Hiring"];

export default function OpportunitiesPage() {
  const [activeType, setActiveType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOpps = opportunities.filter(opp => {
    const matchesType = activeType === "All" || opp.type === activeType;
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      opp.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#002855]">Opportunity Board</h1>
          <p className="text-gray-600 text-sm mt-1">Exclusive internships, jobs, and referrals shared by NSUT alumni.</p>
        </div>
        
        <Button className="bg-[#002855] text-white hover:bg-[#001f42]">
          <Plus className="w-4 h-4 mr-2" /> Post Opportunity
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="lg:w-3/4 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
            <Tabs value={activeType} onValueChange={setActiveType} className="w-full overflow-x-auto">
              <TabsList className="bg-transparent h-auto p-0 flex flex-nowrap w-max">
                {TYPES.map(type => (
                  <TabsTrigger 
                    key={type} 
                    value={type}
                    className="data-[state=active]:bg-[#002855] data-[state=active]:text-white rounded-full px-4 py-1.5 mr-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 shadow-none"
                  >
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            {filteredOpps.map((opp) => {
              let typeColor = "bg-gray-100 text-gray-800 border-gray-200";
              if (opp.type === "Internship") typeColor = "bg-blue-50 text-blue-700 border-blue-200";
              if (opp.type === "Full-time Job") typeColor = "bg-green-50 text-green-700 border-green-200";
              if (opp.type === "Referral") typeColor = "bg-red-50 text-red-700 border-red-200";
              if (opp.type === "Startup Hiring") typeColor = "bg-purple-50 text-purple-700 border-purple-200";

              return (
                <Card key={opp.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={`${typeColor} shadow-none font-medium text-xs`}>
                            {opp.type}
                          </Badge>
                          {opp.isRemote && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 shadow-none text-xs">
                              Remote
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{opp.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1.5 font-medium text-gray-700">
                            <Building2 className="w-4 h-4" /> {opp.company}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" /> {opp.location}
                          </span>
                          <span className="flex items-center gap-1.5 hidden sm:flex">
                            <Clock className="w-4 h-4" /> Posted {formatRelativeTime(opp.createdAt)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:items-end w-full sm:w-auto gap-3">
                        <Button className="w-full sm:w-auto bg-[#002855] text-white hover:bg-[#001f42]">
                          Apply Now <ExternalLink className="w-3.5 h-3.5 ml-2" />
                        </Button>
                        {opp.deadline && (
                          <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded w-fit sm:ml-auto">
                            Deadline: {new Date(opp.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {opp.requirements.slice(0, 3).map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                        {opp.requirements.length > 3 && (
                          <li className="text-blue-600 font-medium list-none -ml-5 mt-2 cursor-pointer hover:underline">
                            + View {opp.requirements.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">Posted by</span>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={opp.postedBy.avatar} />
                            <AvatarFallback className="text-[10px]">{getInitials(opp.postedBy.name)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-[#002855]">{opp.postedBy.name}</span>
                          <span className="text-xs text-gray-500">(&apos;{opp.postedBy.batch})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Users className="w-3.5 h-3.5" />
                        <span>{opp.applicants} applied</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filteredOpps.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No opportunities found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 space-y-4">
          <Card className="bg-white border-gray-100 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Search Opportunities</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Role or company..." 
                  className="pl-8 bg-gray-50 border-gray-200 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#002855] text-white border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-400/20 p-2 rounded-lg">
                  <Briefcase className="w-5 h-5 text-blue-200" />
                </div>
                <h3 className="font-semibold">Hiring at your company?</h3>
              </div>
              <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                Help NSUTians by sharing internships, full-time roles, or referral opportunities from your network.
              </p>
              <Button className="w-full bg-white text-[#002855] hover:bg-gray-100">
                Post an Opportunity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
