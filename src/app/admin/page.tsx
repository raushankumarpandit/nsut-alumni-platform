"use client";

import { 
  Users, GraduationCap, CalendarDays, MessageSquare, 
  Briefcase, TrendingUp, AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from "recharts";
import { adminStats } from "@/lib/data/mock-data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#002855]">Platform Overview</h1>
        <p className="text-gray-600 mt-1">Key metrics and recent activity across the mentorship platform.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Alumni</p>
              <p className="text-2xl font-bold text-gray-900">782</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">1,456</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-lg text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Mentors</p>
              <p className="text-2xl font-bold text-gray-900">124</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Sessions Booked</p>
              <p className="text-2xl font-bold text-gray-900">567</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-amber-50 p-3 rounded-lg text-amber-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Forum Posts</p>
              <p className="text-2xl font-bold text-gray-900">342</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-[#DA291C]/10 p-3 rounded-lg text-[#DA291C]">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Opportunities</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-[#002855]">Monthly Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={adminStats.monthlySignups} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Line type="monotone" dataKey="students" stroke="#002855" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Students" />
                  <Line type="monotone" dataKey="alumni" stroke="#DA291C" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Alumni" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-[#002855]">Mentorship by Domain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminStats.popularDomains} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tick={{fontSize: 12}} />
                  <YAxis dataKey="domain" type="category" tick={{fontSize: 11}} width={100} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="sessions" fill="#002855" radius={[0, 4, 4, 0]} name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Needs Attention Widget */}
      <Card className="bg-white shadow-sm border-orange-200 border">
        <CardHeader className="pb-3 border-b border-gray-100 bg-orange-50/50">
          <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Needs Attention
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">12 Pending Alumni Verifications</p>
                <p className="text-sm text-gray-500">Users uploaded ID proofs awaiting review</p>
              </div>
              <button className="text-sm font-medium text-[#002855] hover:underline">Review</button>
            </div>
            <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">3 Reported Forum Posts</p>
                <p className="text-sm text-gray-500">Posts flagged by community members</p>
              </div>
              <button className="text-sm font-medium text-[#002855] hover:underline">Review</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
