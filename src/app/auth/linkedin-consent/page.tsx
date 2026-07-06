"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LinkedInConsentPage() {
  const [useCustom, setUseCustom] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  const handleSelectAccount = (selectedEmail: string, selectedName: string) => {
    const encodedEmail = encodeURIComponent(selectedEmail);
    const encodedName = encodeURIComponent(selectedName);
    window.location.href = `/api/auth/callback/linkedin?email=${encodedEmail}&name=${encodedName}`;
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    const encodedEmail = encodeURIComponent(email);
    const encodedName = encodeURIComponent(name);
    const encodedRole = encodeURIComponent(role);
    window.location.href = `/api/auth/callback/linkedin?email=${encodedEmail}&name=${encodedName}&role=${encodedRole}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        <CardContent className="p-8">
          {/* LinkedIn Logo */}
          <div className="flex flex-col items-center mb-6">
            <svg className="w-10 h-10 text-[#0A66C2] mb-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <h1 className="text-xl font-semibold text-gray-900">Sign in with LinkedIn</h1>
            <p className="text-xs text-gray-500 mt-1">to sign in to <span className="font-semibold text-[#002855]">NSUT Alumni Network</span></p>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-xs text-gray-600 mb-6 space-y-2">
            <p className="font-semibold text-blue-900">Permissions requested:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Use your name and photo (`profile` scope)</li>
              <li>Use the primary email address associated with your LinkedIn account (`email` scope)</li>
              <li>Use openid identifier (`openid` scope)</li>
            </ul>
          </div>

          {!useCustom ? (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase mb-1">Select simulated account</p>
              
              <button 
                onClick={() => handleSelectAccount("raushan.2k22@nsut.ac.in", "Raushan Kumar")}
                className="w-full text-left p-3.5 flex items-center justify-between rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center font-bold text-sm">
                    RK
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Raushan Kumar</p>
                    <p className="text-xs text-gray-500">raushan.2k22@nsut.ac.in</p>
                  </div>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">Student</span>
              </button>

              <button 
                onClick={() => handleSelectAccount("arjun.mehta@google.com", "Arjun Mehta")}
                className="w-full text-left p-3.5 flex items-center justify-between rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Arjun Mehta</p>
                    <p className="text-xs text-gray-500">arjun.mehta@google.com</p>
                  </div>
                </div>
                <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">Alumni</span>
              </button>

              <button 
                onClick={() => handleSelectAccount("admin@nsut.ac.in", "Admin Moderator")}
                className="w-full text-left p-3.5 flex items-center justify-between rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold text-sm">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Admin Moderator</p>
                    <p className="text-xs text-gray-500">admin@nsut.ac.in</p>
                  </div>
                </div>
                <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium">Admin</span>
              </button>

              <Button 
                variant="ghost" 
                className="w-full justify-center text-sm font-medium text-[#0A66C2] hover:bg-blue-50 mt-2"
                onClick={() => setUseCustom(true)}
              >
                Sign in with another account
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitCustom} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="custom-name">Full Name</Label>
                <Input 
                  id="custom-name"
                  type="text" 
                  placeholder="e.g. John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="custom-email">Email Address</Label>
                <Input 
                  id="custom-email"
                  type="email" 
                  placeholder="name@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="custom-role">Role</Label>
                <select 
                  id="custom-role"
                  className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A66C2] bg-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student (@nsut.ac.in email is required)</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setUseCustom(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-[#0A66C2] hover:bg-[#004182] text-white"
                >
                  Sign In
                </Button>
              </div>
            </form>
          )}

          <div className="flex items-center justify-between border-t border-gray-100 mt-6 pt-4">
            <span className="text-[10px] text-gray-500">NSUT Alumni Platform</span>
            <span className="text-[10px] text-gray-500">LinkedIn OAuth v2.0 (Simulated)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
