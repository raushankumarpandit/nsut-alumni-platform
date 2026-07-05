"use client";

import { useState } from "react";
import { 
  FileText, Video, Link2, Download, 
  ThumbsUp, ExternalLink, Search, FolderOpen 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/utils";

// Mock Data inline for resources since it wasn't in mock-data.ts
const resources = [
  {
    id: "r1",
    title: "SDE Interview Preparation Guide",
    description: "Comprehensive guide for cracking software engineering interviews at FAANG companies, covering DSA, System Design, and behavioral questions.",
    type: "document", // document, video, link, github
    category: "Interview Prep",
    uploadedBy: { name: "Arjun Mehta", avatar: "/avatars/arjun.jpg", batch: "2022" },
    upvotes: 245,
    downloads: 1250,
    url: "#"
  },
  {
    id: "r2",
    title: "ATS-Friendly Resume Template",
    description: "A clean, single-page LaTeX template that parses perfectly in all ATS systems. Used this to get callbacks from Google, Meta, and Microsoft.",
    type: "github",
    category: "Resume Templates",
    uploadedBy: { name: "Priya Sharma", avatar: "/avatars/priya.jpg", batch: "2023" },
    upvotes: 189,
    downloads: 856,
    url: "#"
  },
  {
    id: "r3",
    title: "UPSC CSE Roadmap for Engineering Students",
    description: "Detailed roadmap and booklist for preparing for UPSC Civil Services Examination while managing engineering coursework.",
    type: "document",
    category: "UPSC & Gov",
    uploadedBy: { name: "Rahul Verma", avatar: "/avatars/rahul.jpg", batch: "2019" },
    upvotes: 312,
    downloads: 940,
    url: "#"
  },
  {
    id: "r4",
    title: "Higher Studies (MS/PhD) in USA - Complete Webinar",
    description: "Recording of the session covering GRE prep, university shortlisting, SOP writing, and funding opportunities.",
    type: "video",
    category: "Higher Studies",
    uploadedBy: { name: "Sneha Gupta", avatar: "/avatars/sneha.jpg", batch: "2021" },
    upvotes: 156,
    downloads: 0,
    url: "#"
  },
  {
    id: "r5",
    title: "System Design Interview Cheat Sheet",
    description: "Quick reference guide for system design interviews, including load balancers, caching, databases, and microservices architecture.",
    type: "document",
    category: "Interview Prep",
    uploadedBy: { name: "Arjun Mehta", avatar: "/avatars/arjun.jpg", batch: "2022" },
    upvotes: 420,
    downloads: 2100,
    url: "#"
  },
  {
    id: "r6",
    title: "List of Companies visiting NSUT",
    description: "Aggregated list of companies visiting campus for placements along with role types and historical CTC data.",
    type: "link",
    category: "Placement Roadmaps",
    uploadedBy: { name: "Ananya Patel", avatar: "/avatars/ananya.jpg", batch: "2024" },
    upvotes: 560,
    downloads: 0,
    url: "#"
  }
];

const CATEGORIES = ["All", "Interview Prep", "Resume Templates", "Placement Roadmaps", "Higher Studies", "UPSC & Gov"];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter(res => {
    const matchesCategory = activeCategory === "All" || res.category === activeCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch(type) {
      case "document": return <FileText className="w-6 h-6 text-blue-500" />;
      case "video": return <Video className="w-6 h-6 text-red-500" />;
      case "github": return <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>;
      case "link": return <Link2 className="w-6 h-6 text-green-500" />;
      default: return <FileText className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#002855]">Resource Hub</h1>
          <p className="text-gray-600 text-sm mt-1">Curated materials, guides, and templates shared by alumni.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search resources..." 
            className="pl-8 bg-gray-50 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center pb-2">
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full overflow-x-auto">
          <TabsList className="bg-transparent h-auto p-0 flex flex-nowrap w-max">
            {CATEGORIES.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="data-[state=active]:bg-[#002855] data-[state=active]:text-white rounded-full px-4 py-1.5 mr-2 text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
            <CardContent className="p-5 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {getIcon(resource.type)}
                </div>
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-[10px] font-medium shadow-none">
                  {resource.category}
                </Badge>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#002855] transition-colors line-clamp-2">
                {resource.title}
              </h3>
              
              <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow">
                {resource.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={resource.uploadedBy.avatar} />
                      <AvatarFallback className="text-[10px]">{getInitials(resource.uploadedBy.name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600 font-medium">{resource.uploadedBy.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3"/> {resource.upvotes}</span>
                    {resource.downloads > 0 && (
                      <span className="flex items-center gap-1"><Download className="w-3 h-3"/> {resource.downloads}</span>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-[#002855] text-white hover:bg-[#001f42]">
                  {resource.type === "document" ? "Download File" : "Open Resource"} 
                  {resource.type === "document" ? <Download className="w-4 h-4 ml-2"/> : <ExternalLink className="w-4 h-4 ml-2"/>}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No resources found matching your search.</p>
        </div>
      )}
    </div>
  );
}
