"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GoogleConsentPage() {
  const [useCustom, setUseCustom] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  const handleSelectAccount = (selectedEmail: string, selectedName: string) => {
    // Redirect to callback route
    const encodedEmail = encodeURIComponent(selectedEmail);
    const encodedName = encodeURIComponent(selectedName);
    window.location.href = `/api/auth/callback/google?email=${encodedEmail}&name=${encodedName}`;
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    const encodedEmail = encodeURIComponent(email);
    const encodedName = encodeURIComponent(name);
    const encodedRole = encodeURIComponent(role);
    window.location.href = `/api/auth/callback/google?email=${encodedEmail}&name=${encodedName}&role=${encodedRole}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        <CardContent className="p-8">
          {/* Google Logo representation */}
          <div className="flex flex-col items-center mb-8">
            <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <h1 className="text-xl font-medium text-gray-900">Sign in with Google</h1>
            <p className="text-sm text-gray-600 mt-2">to continue to <span className="font-semibold text-[#002855]">NSUT Alumni Network</span></p>
          </div>

          {!useCustom ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Choose an account</p>
              
              <button 
                onClick={() => handleSelectAccount("raushan.2k22@nsut.ac.in", "Raushan Kumar")}
                className="w-full text-left p-3.5 flex items-center gap-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#002855] text-white flex items-center justify-center font-bold text-sm">
                  RK
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Raushan Kumar</p>
                  <p className="text-xs text-gray-500">raushan.2k22@nsut.ac.in</p>
                </div>
              </button>

              <button 
                onClick={() => handleSelectAccount("sakshi.2k23@nsut.ac.in", "Sakshi Agrawal")}
                className="w-full text-left p-3.5 flex items-center gap-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  SA
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Sakshi Agrawal</p>
                  <p className="text-xs text-gray-500">sakshi.2k23@nsut.ac.in</p>
                </div>
              </button>

              <button 
                onClick={() => handleSelectAccount("admin@nsut.ac.in", "Admin Moderator")}
                className="w-full text-left p-3.5 flex items-center gap-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold text-sm">
                  AM
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Admin Moderator (Admin)</p>
                  <p className="text-xs text-gray-500">admin@nsut.ac.in</p>
                </div>
              </button>

              <Button 
                variant="ghost" 
                className="w-full justify-center text-sm font-medium text-blue-600 hover:bg-blue-50 mt-2"
                onClick={() => setUseCustom(true)}
              >
                Use another account
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
                  className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student (Use @nsut.ac.in to authenticate)</option>
                  <option value="alumni">Alumni (Any email)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setUseCustom(false)}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue
                </Button>
              </div>
            </form>
          )}

          <div className="mt-8 text-xs text-gray-500 leading-normal">
            To continue, Google will share your name, email address, language preference, and profile picture with NSUT Alumni Network. Before using this app, you can review its privacy policy and terms of service.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
