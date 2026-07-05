"use client";

import { useState } from "react";
import { User, Mail, Briefcase, GraduationCap, Link as LinkIcon, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { alumni } from "@/lib/data/mock-data";

export default function SettingsPage() {
  const alum = alumni[0]; // using Arjun for demo

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#002855]">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Manage your public profile and platform preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Navigation */}
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start bg-blue-50 text-[#002855] font-medium">
            <User className="mr-2 h-4 w-4" /> Personal Info
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <Briefcase className="mr-2 h-4 w-4" /> Professional
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <LinkIcon className="mr-2 h-4 w-4" /> Social Links
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <GraduationCap className="mr-2 h-4 w-4" /> Mentorship
          </Button>
        </div>

        {/* Right Column - Forms */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-[#002855]">Personal Information</CardTitle>
              <CardDescription>Update your photo and personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-2 border-gray-100">
                  <AvatarImage src={alum.avatar} />
                  <AvatarFallback className="text-xl">AM</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="mb-2">
                    <Camera className="w-4 h-4 mr-2" /> Change Photo
                  </Button>
                  <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={alum.name} />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address (NSUT / Personal)</Label>
                  <Input id="email" defaultValue="arjun.mehta@example.com" disabled className="bg-gray-50" />
                  <p className="text-[10px] text-gray-500">Contact admin to change your registered email.</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    defaultValue={alum.bio} 
                    className="min-h-[120px] resize-none"
                  />
                  <p className="text-[10px] text-gray-500">Brief description for your profile. 500 characters max.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-[#002855]">Professional Details</CardTitle>
              <CardDescription>Update your current role and company.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="company">Current Company</Label>
                  <Input id="company" defaultValue={alum.currentCompany} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input id="role" defaultValue={alum.role} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Select defaultValue={alum.domain}>
                    <SelectTrigger id="domain">
                      <SelectValue placeholder="Select Domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                      <SelectItem value="Data Science & AI/ML">Data Science & AI/ML</SelectItem>
                      <SelectItem value="Product Management">Product Management</SelectItem>
                      <SelectItem value="Finance & Quant">Finance & Quant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={alum.location} />
                </div>
              </div>

              <div className="grid gap-2 pt-2">
                <Label htmlFor="skills">Skills (Comma separated)</Label>
                <Input id="skills" defaultValue={alum.skills.join(", ")} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 pb-10">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-[#002855] text-white hover:bg-[#001f42]">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
