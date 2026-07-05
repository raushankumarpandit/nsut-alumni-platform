"use client";

import { use } from "react";
import Link from "next/link";
import { 
  MapPin, CheckCircle2, Globe, 
  Briefcase, GraduationCap, Award, Star, Users, ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { alumni } from "@/lib/data/mock-data";
import { getInitials, getAvailabilityColor } from "@/lib/utils";

export default function AlumniProfilePage({ params }: { params: Promise<{ id: string }> }) {
  // Use React.use() to unwrap the params Promise as required by Next.js 15
  const unwrappedParams = use(params);
  const alum = alumni.find(a => a.id === unwrappedParams.id);

  if (!alum) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
        <p className="text-gray-500 mb-6">The alumni profile you are looking for does not exist.</p>
        <Button asChild className="bg-[#002855]">
          <Link href="/directory">Back to Directory</Link>
        </Button>
      </div>
    );
  }

  const similarAlumni = alumni
    .filter(a => a.id !== alum.id && (a.branch === alum.branch || a.domain === alum.domain))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild className="text-gray-500 hover:text-[#002855] -ml-4 mb-2">
        <Link href="/directory"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory</Link>
      </Button>

      {/* Top Banner & Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-blue-50 to-[#002855]/10 w-full"></div>
        
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-16 sm:-mt-20 mb-6">
            <div className="relative inline-block">
              <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-white shadow-md bg-white">
                <AvatarImage src={alum.avatar} className="object-cover" />
                <AvatarFallback className="bg-[#002855] text-white text-4xl font-bold">
                  {getInitials(alum.name)}
                </AvatarFallback>
              </Avatar>
              {alum.verificationStatus === "verified" && (
                <CheckCircle2 className="w-8 h-8 text-blue-500 absolute bottom-2 right-2 bg-white rounded-full border-2 border-white" />
              )}
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{alum.name}</h1>
                  <p className="text-lg text-gray-700 font-medium">{alum.role} at {alum.currentCompany}</p>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="bg-[#002855] hover:bg-[#001f42] text-white" 
                    disabled={alum.availability !== "available"}
                    asChild={alum.availability === "available"}
                  >
                    {alum.availability === "available" ? (
                      <Link href={`/mentorship?mentor=${alum.id}`}>Request Mentorship</Link>
                    ) : (
                      <span>Not Available</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{alum.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span>{alum.branch} &apos;{alum.graduationYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span>{alum.yearsOfExperience} {alum.yearsOfExperience === 1 ? 'year' : 'years'} exp.</span>
            </div>
            <div>
              <Badge variant="outline" className={`capitalize ${getAvailabilityColor(alum.availability)} shadow-none`}>
                {alum.availability} for Mentorship
              </Badge>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-100">
            {alum.socialLinks.linkedin && (
              <a href={alum.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors p-2 bg-gray-50 rounded-full">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
            {alum.socialLinks.github && (
              <a href={alum.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors p-2 bg-gray-50 rounded-full">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            {alum.socialLinks.website && (
              <a href={alum.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#002855] transition-colors p-2 bg-gray-50 rounded-full">
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-[#002855]">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{alum.bio}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-[#002855]">Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alum.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {(alum.achievements && alum.achievements.length > 0) && (
            <Card className="bg-white shadow-sm border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl text-[#002855]">Key Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {alum.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-amber-100 p-1.5 rounded-full text-amber-600 shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg text-[#002855]">Mentorship Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-[#002855]" />
                    <span>Sessions Completed</span>
                  </div>
                  <span className="font-bold text-gray-900">{alum.mentorshipCount}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span>Average Rating</span>
                  </div>
                  <span className="font-bold text-gray-900">{alum.rating} / 5.0</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span>Domain</span>
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{alum.domain.split(' ')[0]}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {alum.isHigherStudies && alum.university && (
            <Card className="bg-white shadow-sm border-gray-100 border-l-4 border-l-[#002855]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-full text-[#002855]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Higher Studies</h3>
                    <p className="text-sm text-gray-600">{alum.university}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg text-[#002855]">Similar Alumni</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {similarAlumni.map((similar) => (
                  <Link key={similar.id} href={`/directory/${similar.id}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors group">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      <AvatarImage src={similar.avatar} />
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                        {getInitials(similar.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 group-hover:text-[#002855] truncate">{similar.name}</p>
                      <p className="text-xs text-gray-500 truncate">{similar.role} @ {similar.currentCompany}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
