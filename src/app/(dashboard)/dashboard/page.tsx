"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, CalendarDays, MessageSquare, 
  Briefcase, CheckCircle2, Plus, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { alumni, students, mentorshipRequests, opportunities } from "@/lib/data/mock-data";
import { getInitials, getStatusColor, formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const [role, setRole] = useState<"student" | "alumni">("student");
  
  // Mock current user
  const student = students[0];
  const alum = alumni[0];

  return (
    <div className="space-y-6">
      {/* Role Toggle for Demo Purposes */}
      <div className="flex justify-end mb-4">
        <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex shadow-sm">
          <button
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${role === "student" ? "bg-[#002855] text-white" : "text-gray-600 hover:bg-gray-100"}`}
            onClick={() => setRole("student")}
          >
            Student View
          </button>
          <button
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${role === "alumni" ? "bg-[#002855] text-white" : "text-gray-600 hover:bg-gray-100"}`}
            onClick={() => setRole("alumni")}
          >
            Alumni View
          </button>
        </div>
      </div>

      {role === "student" ? (
        <StudentDashboard student={student} />
      ) : (
        <AlumniDashboard alum={alum} />
      )}
    </div>
  );
}

function StudentDashboard({ student }: { student: typeof students[0] }) {
  const studentRequests = mentorshipRequests.filter(r => r.studentId === student.id);
  const acceptedRequests = studentRequests.filter(r => r.status === "accepted");
  
  // Get full mentor objects for saved mentors
  const savedMentors = student.savedMentors
    .map(id => alumni.find(a => a.id === id))
    .filter(Boolean) as typeof alumni;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl md:text-3xl font-bold text-[#002855]">Welcome back, {student.name.split(' ')[0]}</h1>
        <p className="text-gray-600 mt-1">{formatDate(new Date().toISOString())}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500 font-medium">Saved Mentors</p>
            <p className="text-2xl font-bold text-gray-900">{savedMentors.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Requests Sent</p>
            <p className="text-2xl font-bold text-gray-900">{studentRequests.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Upcoming Sessions</p>
            <p className="text-2xl font-bold text-gray-900">{acceptedRequests.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Forum Posts</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Sessions */}
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#002855] flex items-center justify-between">
                Upcoming Sessions
                <Link href="/mentorship" className="text-sm font-medium text-blue-600 hover:underline">View All</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {acceptedRequests.length > 0 ? (
                <div className="space-y-3">
                  {acceptedRequests.map(req => (
                    <div key={req.id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 bg-gray-50">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-100 text-blue-800 rounded-md shrink-0">
                        <span className="text-xs font-bold uppercase">{new Date(req.preferredDate).toLocaleString('default', {month:'short'})}</span>
                        <span className="text-lg font-bold leading-none">{new Date(req.preferredDate).getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">Mentorship with {req.alumniName}</p>
                        <p className="text-xs text-gray-500">{req.topic} • {req.preferredTime}</p>
                      </div>
                      <Button size="sm" variant="outline" className="hidden sm:inline-flex bg-white">Join Link</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No upcoming sessions. Book a mentor to get started.</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Mentorship Requests */}
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#002855]">Recent Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentRequests.slice(0, 3).map(req => (
                  <div key={req.id} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={req.alumniAvatar} />
                        <AvatarFallback className="text-xs">{getInitials(req.alumniName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{req.alumniName}</p>
                        <p className="text-xs text-gray-500">Requested {formatDate(req.createdAt)}</p>
                      </div>
                    </div>
                    <Badge className={`capitalize shadow-none border-0 ${getStatusColor(req.status)} text-[10px] px-2 py-0`}>
                      {req.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Saved Mentors */}
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#002855]">Saved Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedMentors.slice(0, 3).map(mentor => (
                  <Link key={mentor.id} href={`/directory/${mentor.id}`} className="flex items-center gap-3 group">
                    <Avatar className="h-10 w-10 border border-gray-100">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback>{getInitials(mentor.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 group-hover:text-[#002855] truncate">{mentor.name}</p>
                      <p className="text-xs text-gray-500 truncate">{mentor.role} @ {mentor.currentCompany}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 text-xs h-8 border-gray-200" asChild>
                <Link href="/directory">Find More Mentors</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="bg-[#002855] text-white shadow-sm border-0">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-900/50" asChild>
                  <Link href="/mentorship"><CalendarDays className="w-4 h-4 mr-2" /> Book a Session</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-900/50" asChild>
                  <Link href="/forum"><MessageSquare className="w-4 h-4 mr-2" /> Ask in Forum</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-900/50" asChild>
                  <Link href="/opportunities"><Briefcase className="w-4 h-4 mr-2" /> Find Internships</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AlumniDashboard({ alum }: { alum: typeof alumni[0] }) {
  const incomingRequests = mentorshipRequests.filter(r => r.alumniId === alum.id && r.status === "pending");
  const myOpportunities = opportunities.filter(o => o.postedBy.id === alum.id);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#002855]">Welcome back, {alum.name.split(' ')[0]}</h1>
          <p className="text-gray-600 mt-1">Thank you for contributing to the NSUT community.</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 min-w-[250px]">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-gray-700">Profile Completion</span>
            <span className="text-[#002855]">85%</span>
          </div>
          <Progress value={85} className="h-2 bg-gray-200" indicatorClassName="bg-[#002855]" />
          <p className="text-xs text-gray-500 mt-2 text-center"><Link href="/settings" className="text-blue-600 hover:underline">Add your achievements</Link> to reach 100%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <Users className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{alum.mentorshipCount}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Sessions</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <Star className="w-6 h-6 text-amber-500 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{alum.rating}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Avg Rating</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <CalendarDays className="w-6 h-6 text-green-500 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{incomingRequests.length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pending Requests</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <MessageSquare className="w-6 h-6 text-purple-500 mb-2" />
            <p className="text-2xl font-bold text-gray-900">4</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Forum Posts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Incoming Requests */}
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader className="pb-3 border-b border-gray-50 mb-3">
              <CardTitle className="text-lg text-[#002855] flex items-center justify-between">
                Mentorship Requests
                {incomingRequests.length > 0 && (
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 shadow-none">{incomingRequests.length} New</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {incomingRequests.length > 0 ? (
                <div className="space-y-4">
                  {incomingRequests.map(req => (
                    <div key={req.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{req.studentName}</span>
                          <span className="text-xs text-gray-500">({req.topic})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">&quot;{req.message}&quot;</p>
                        <p className="text-xs text-gray-500 font-medium">
                          Prefers: {formatDate(req.preferredDate)} • {req.preferredTime}
                        </p>
                      </div>
                      <div className="flex sm:flex-col gap-2 shrink-0">
                        <Button size="sm" className="bg-[#002855] text-white hover:bg-[#001f42] w-full">Accept</Button>
                        <Button size="sm" variant="outline" className="w-full">Decline</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-6">You have no pending mentorship requests.</p>
              )}
            </CardContent>
          </Card>

          {/* My Opportunities */}
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-[#002855]">Opportunities I&apos;ve Posted</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600">
                  <Plus className="w-4 h-4 mr-1" /> Post New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {myOpportunities.length > 0 ? (
                <div className="space-y-3">
                  {myOpportunities.map(opp => (
                    <div key={opp.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-md">
                      <div>
                        <p className="font-medium text-sm text-gray-900">{opp.title}</p>
                        <p className="text-xs text-gray-500">{opp.company} • {opp.location}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-[10px] font-normal mb-1">{opp.type}</Badge>
                        <p className="text-xs text-gray-500">{opp.applicants} applicants</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 py-2">You haven&apos;t posted any opportunities yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Availability Settings */}
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#002855]">Mentorship Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <p className="font-medium text-sm text-gray-900">Available for Mentorship</p>
                  <p className="text-xs text-gray-500">Students can request sessions</p>
                </div>
                <Switch checked={alum.availability === "available"} />
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full text-xs" asChild>
                <Link href="/settings">Update Availability Schedule</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Verification Badge */}
          <Card className="bg-white shadow-sm border-gray-100 overflow-hidden">
            <div className="h-2 w-full bg-blue-500"></div>
            <CardContent className="p-5 flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-blue-500 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Verified Alumni</h3>
                <p className="text-xs text-gray-500 mt-1">Your profile has been verified by the NSUT Alumni Association.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
