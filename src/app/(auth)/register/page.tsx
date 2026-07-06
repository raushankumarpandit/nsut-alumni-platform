"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/components/auth-provider";
import { AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [role, setRole] = useState("student");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [year, setYear] = useState("");
  const [company, setCompany] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Enforce email domain check on client-side for students
    if (role === "student" && !email.toLowerCase().trim().endsWith("@nsut.ac.in")) {
      setError("Students must use their official @nsut.ac.in email address.");
      return;
    }

    setIsSubmitting(true);

    const result = await register({
      firstName,
      lastName,
      email,
      password,
      role,
      branch,
      graduationYear: Number(year),
      company: role === "alumni" ? company : undefined,
      roleTitle: role === "alumni" ? roleTitle : undefined,
      linkedin: role === "alumni" ? linkedin : undefined,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Registration failed. Please try again.");
    }
  };

  return (
    <Card className="bg-white shadow-xl border-0 ring-1 ring-gray-200 mb-8">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-sm text-gray-500 mt-2">Join the official NSUT Alumni Network</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <Tabs 
          value={role} 
          onValueChange={(val) => {
            setRole(val);
            setError(null);
          }} 
          className="w-full mb-6"
        >
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1">
            <TabsTrigger value="student" className="data-[state=active]:bg-white data-[state=active]:text-[#002855] data-[state=active]:shadow-sm">
              Current Student
            </TabsTrigger>
            <TabsTrigger value="alumni" className="data-[state=active]:bg-white data-[state=active]:text-[#002855] data-[state=active]:shadow-sm">
              Alumni
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required 
                className="h-11" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required 
                className="h-11" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder={role === "student" ? "name.batch@nsut.ac.in" : "name@example.com"} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="h-11"
            />
            {role === "student" && (
              <p className="text-xs text-gray-500 font-medium">Please use your official NSUT email ending in @nsut.ac.in</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Select value={branch} onValueChange={(val) => setBranch(val || "CSE")}>
                <SelectTrigger id="branch" className="h-11">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="ECE">ECE</SelectItem>
                  <SelectItem value="EE">EE</SelectItem>
                  <SelectItem value="ME">ME</SelectItem>
                  <SelectItem value="ICE">ICE</SelectItem>
                  <SelectItem value="BT">BT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">{role === "student" ? "Graduation Year (Expected)" : "Graduation Year"}</Label>
              <Input 
                id="year" 
                type="number" 
                placeholder="e.g. 2026" 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required 
                className="h-11" 
              />
            </div>
          </div>

          {role === "alumni" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Current Company</Label>
                  <Input 
                    id="company" 
                    placeholder="e.g. Google" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roleTitle">Job Title</Label>
                  <Input 
                    id="roleTitle" 
                    placeholder="e.g. Software Engineer" 
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    required
                    className="h-11" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                <Input 
                  id="linkedin" 
                  type="url" 
                  placeholder="https://linkedin.com/in/..." 
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  required
                  className="h-11" 
                />
                <p className="text-xs text-gray-500">Required for verification of alumni status</p>
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="h-11" 
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#002855] hover:bg-[#001f42] text-white h-11 text-base font-semibold mt-4 transition-all duration-150 active:scale-[0.98]"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#002855] hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
