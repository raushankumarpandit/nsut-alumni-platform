"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, CalendarDays, ExternalLink, MessageSquare, 
  Search, Star, CheckCircle2, Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { alumni, mentorshipRequests } from "@/lib/data/mock-data";
import { getInitials, getStatusColor, formatDate } from "@/lib/utils";

export default function MentorshipPage() {
  const availableMentors = alumni.filter(a => a.availability === "available" && a.verificationStatus === "verified");
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");

  const filteredMentors = availableMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mentor.currentCompany.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = domainFilter === "All" || mentor.domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-3xl font-bold text-[#002855] mb-2">Mentorship Program</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Book 1:1 sessions with experienced NSUT alumni for career guidance, resume reviews, interview prep, and more.
        </p>
      </div>

      <Tabs defaultValue="find-mentors" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="find-mentors">Find Mentors</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="find-mentors" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search mentors by name or company..." 
                className="pl-9 bg-gray-50 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={domainFilter} onValueChange={(v) => setDomainFilter(v || "All")}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Domains</SelectItem>
                  <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                  <SelectItem value="Data Science & AI/ML">Data Science & AI/ML</SelectItem>
                  <SelectItem value="Core Engineering">Core Engineering</SelectItem>
                  <SelectItem value="MBA & Management">MBA & Management</SelectItem>
                  <SelectItem value="Startups & Entrepreneurship">Startups & Entrepreneurship</SelectItem>
                  <SelectItem value="Finance & Quant">Finance & Quant</SelectItem>
                  <SelectItem value="Product Management">Product Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback className="bg-[#002855] text-white">
                        {getInitials(mentor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {mentor.domain.split(' ')[0]}
                    </Badge>
                  </div>
                  
                  <div className="mb-4 flex-grow">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{mentor.name}</h3>
                    <p className="text-sm font-medium text-gray-600 mb-3 h-10 line-clamp-2">
                      {mentor.role} at {mentor.currentCompany}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{mentor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{mentor.mentorshipCount} sessions</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {mentor.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="text-[10px] font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-[#002855] hover:bg-[#001f42] text-white">Book Session</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Request Mentorship</DialogTitle>
                          <DialogDescription>
                            Send a session request to {mentor.name}. They will review and confirm the schedule.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 my-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={mentor.avatar} />
                            <AvatarFallback>{getInitials(mentor.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{mentor.name}</p>
                            <p className="text-xs text-gray-500">{mentor.role} @ {mentor.currentCompany}</p>
                          </div>
                        </div>

                        <div className="grid gap-4 py-2">
                          <div className="grid gap-2">
                            <Label htmlFor="topic">Topic / Purpose</Label>
                            <Select>
                              <SelectTrigger id="topic">
                                <SelectValue placeholder="Select topic" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="career">Career Guidance</SelectItem>
                                <SelectItem value="resume">Resume Review</SelectItem>
                                <SelectItem value="interview">Interview Prep</SelectItem>
                                <SelectItem value="higher-studies">Higher Studies / MS</SelectItem>
                                <SelectItem value="startups">Startup Ideation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="date">Preferred Date</Label>
                              <Input id="date" type="date" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="time">Preferred Time</Label>
                              <Select>
                                <SelectTrigger id="time">
                                  <SelectValue placeholder="Select time slot" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                                  <SelectItem value="afternoon">Afternoon (1 PM - 5 PM)</SelectItem>
                                  <SelectItem value="evening">Evening (6 PM - 9 PM)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea 
                              id="message" 
                              placeholder="Briefly describe what you'd like to discuss and any specific questions you have..." 
                              className="h-24 resize-none"
                            />
                          </div>
                        </div>
                        
                        <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
                          <Button variant="outline" className="w-full sm:w-auto" asChild>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSc_PLACEHOLDER/viewform" target="_blank" rel="noopener noreferrer">
                              Google Form <ExternalLink className="w-3.5 h-3.5 ml-2" />
                            </a>
                          </Button>
                          <Button type="submit" className="w-full sm:w-auto bg-[#002855] text-white hover:bg-[#001f42]">
                            Submit Request
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredMentors.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No available mentors found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-4">
          {mentorshipRequests.map((req) => (
            <Card key={req.id} className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-5 flex flex-col md:flex-row gap-5 items-start">
                <div className="flex flex-col items-center justify-center min-w-[100px] p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</span>
                  <Badge className={`capitalize shadow-none border-0 ${getStatusColor(req.status)} hover:${getStatusColor(req.status)}`}>
                    {req.status}
                  </Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={req.alumniAvatar} />
                      <AvatarFallback className="text-xs bg-gray-200 text-gray-700">{getInitials(req.alumniName)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900">Request to {req.alumniName}</span>
                    <Badge variant="outline" className="ml-auto bg-gray-50 text-gray-600 font-normal shadow-none hidden sm:inline-flex">
                      {req.topic}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 italic border-l-2 border-gray-200 pl-3 py-1 mb-3 bg-gray-50/50">
                    &quot;{req.message}&quot;
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" /> Pref Date: {formatDate(req.preferredDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Time: {req.preferredTime}
                    </span>
                    <span className="flex items-center gap-1 sm:ml-auto">
                      Requested: {formatDate(req.createdAt)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
