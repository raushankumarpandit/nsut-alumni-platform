"use client";

import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, UserCheck, CalendarDays, Building2, MapPin, 
  CheckCircle2, Star, Clock, Heart, ThumbsUp, MessageSquare, Eye, ArrowRight 
} from "lucide-react";
import { alumni, forumPosts, opportunities, events, alumniStories } from "@/lib/data/mock-data";
import { getInitials, formatRelativeTime, truncateText } from "@/lib/utils";

import { useState, useEffect } from "react";

export default function LandingPage() {
  const featuredAlumni = alumni.slice(0, 8);
  const topMentors = alumni.filter(a => a.availability === "available").slice(0, 4);
  const featuredStories = alumniStories.filter(s => s.featured).slice(0, 3);
  const upcomingEvents = events.slice(0, 4);
  const latestOpportunities = opportunities.slice(0, 3);
  const trendingDiscussions = forumPosts.slice(0, 4);

  const [stats, setStats] = useState({
    alumni: 780,
    mentors: 120,
    sessions: 450,
    companies: 50,
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setStats(data);
        }
      })
      .catch((err) => console.error("Error loading stats", err));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <div className="bg-[#002855] text-white px-4 py-2.5 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 shadow-inner">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        🚀 NSUT Alumni Network Demo — Pre-Launch Beta Mode. Explore using registered emails or simulated Google/LinkedIn logins.
      </div>

      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-blue-50 text-[#002855] border-blue-200 px-3 py-1 text-sm font-medium">
                  NSUT Official Alumni Platform
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#002855] tracking-tight leading-tight">
                  Connect Beyond <br className="hidden md:block"/> Graduation
                </h1>
                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  The official mentorship and networking platform for Netaji Subhas University of Technology. Connect with {stats.alumni}+ alumni across 15+ countries for career guidance, internships, and community building.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#002855] hover:bg-[#001f42] text-white rounded-md text-base" asChild>
                  <Link href="/register">Join as Student</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-[#002855] text-[#002855] hover:bg-blue-50 rounded-md text-base" asChild>
                  <Link href="/register">Join as Alumni</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Alumni</span>
                  </div>
                  <p className="text-2xl font-bold text-[#002855]">{stats.alumni}+</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <UserCheck className="w-4 h-4" />
                    <span className="text-sm font-medium">Mentors</span>
                  </div>
                  <p className="text-2xl font-bold text-[#002855]">{stats.mentors}+</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <CalendarDays className="w-4 h-4" />
                    <span className="text-sm font-medium">Sessions</span>
                  </div>
                  <p className="text-2xl font-bold text-[#002855]">{stats.sessions}+</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Companies</span>
                  </div>
                  <p className="text-2xl font-bold text-[#002855]">{stats.companies}+</p>
                </div>
              </div>
            </div>

            {/* Decorative Element instead of Image */}
            <div className="relative hidden lg:block h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-red-50 rounded-full blur-3xl opacity-50"></div>
              
              <Card className="absolute top-10 right-10 w-72 shadow-xl border-white bg-white/90 backdrop-blur">
                <CardContent className="p-5 flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-[#002855]">
                    <AvatarImage src="/avatars/arjun.jpg" />
                    <AvatarFallback className="bg-[#002855] text-white">AM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">Arjun Mehta</p>
                    <p className="text-xs text-gray-500">SDE at Google • &apos;22 CSE</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute top-48 left-0 w-80 shadow-xl border-white bg-white/90 backdrop-blur z-10">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Mentorship Accepted</Badge>
                    <span className="text-xs text-gray-400">Just now</span>
                  </div>
                  <p className="text-sm font-medium">Session scheduled with Rahul Verma</p>
                  <p className="text-xs text-gray-500 mt-1">Topic: Startup Ideation</p>
                </CardContent>
              </Card>

              <Card className="absolute bottom-20 right-20 w-72 shadow-xl border-white bg-white/90 backdrop-blur">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="bg-[#DA291C]/10 p-3 rounded-full">
                    <Building2 className="w-6 h-6 text-[#DA291C]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">New Opportunity</p>
                    <p className="text-xs text-gray-500">SDE Intern at Microsoft</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 2: Featured Alumni */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#002855] mb-3">Featured Alumni</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Distinguished graduates making an impact at top companies and institutions worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredAlumni.map((alum) => (
                <Card key={alum.id} className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4 relative inline-block">
                      <Avatar className="h-20 w-20 border-2 border-transparent group-hover:border-blue-100 transition-all">
                        <AvatarImage src={alum.avatar} />
                        <AvatarFallback className="bg-[#002855] text-white text-xl">
                          {getInitials(alum.name)}
                        </AvatarFallback>
                      </Avatar>
                      {alum.verificationStatus === "verified" && (
                        <CheckCircle2 className="w-5 h-5 text-blue-500 absolute bottom-0 right-0 bg-white rounded-full" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{alum.name}</h3>
                    <p className="text-sm text-[#002855] font-medium mb-1">
                      {alum.branch} &apos;{alum.graduationYear}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {alum.role} at {alum.currentCompany}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="outline" className="border-[#002855] text-[#002855]" asChild>
                <Link href="/directory">View Alumni Directory</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3: Top Mentors */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#002855] mb-3">Top Mentors</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Connect with experienced alumni for 1:1 personalized career guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topMentors.map((mentor) => (
                <Card key={mentor.id} className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full bg-white">
                  <CardContent className="p-6 flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mentor.avatar} />
                        <AvatarFallback className="bg-[#002855] text-white">
                          {getInitials(mentor.name)}
                        </AvatarFallback>
                      </Avatar>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        {mentor.domain.split(' ')[0]}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{mentor.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 h-10 line-clamp-2">
                      {mentor.role} at {mentor.currentCompany}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{mentor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{mentor.mentorshipCount} sessions</span>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Button className="w-full bg-[#002855] hover:bg-[#001f42] text-white" asChild>
                      <Link href="/mentorship">Book Session</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Alumni Stories */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-[#002855] mb-3">Alumni Stories</h2>
                <p className="text-gray-600 text-lg">Inspiring journeys from campus to career.</p>
              </div>
              <Link href="/stories" className="hidden sm:flex items-center text-[#002855] font-medium hover:underline">
                View all stories <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredStories.map((story) => {
                let badgeColor = "bg-gray-100 text-gray-800";
                if (story.category === "Success Story") badgeColor = "bg-green-100 text-green-800";
                if (story.category === "UPSC Journey") badgeColor = "bg-amber-100 text-amber-800";
                if (story.category === "Startup Journey") badgeColor = "bg-purple-100 text-purple-800";
                if (story.category === "International Placement") badgeColor = "bg-blue-100 text-blue-800";

                return (
                  <Card key={story.id} className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full bg-white">
                    <CardHeader className="pb-4">
                      <div className="mb-3">
                        <Badge className={`${badgeColor} hover:${badgeColor} border-0 shadow-none`}>
                          {story.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl leading-tight hover:text-[#002855] cursor-pointer">
                        <Link href={`/stories/${story.id}`}>{story.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                        {story.excerpt}
                      </p>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={story.author.avatar} />
                          <AvatarFallback className="bg-gray-200 text-gray-700">
                            {getInitials(story.author.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{story.author.name}</p>
                          <p className="text-xs text-gray-500">{story.author.branch} &apos;{story.author.batch}</p>
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-6 pt-0 flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-4">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {story.readTime} min read</span>
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5"/> {story.likes}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 5 & 6: Events & Opportunities */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Upcoming Events */}
              <div>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-2xl font-bold text-[#002855]">Upcoming Events</h2>
                  <Link href="/events" className="text-sm text-[#002855] font-medium hover:underline">View all</Link>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const eventDate = new Date(event.date);
                    const month = eventDate.toLocaleString('default', { month: 'short' });
                    const day = eventDate.getDate();
                    
                    return (
                      <div key={event.id} className="flex gap-4 p-4 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="flex flex-col items-center justify-center min-w-16 h-16 rounded-md bg-blue-50 border border-blue-100 text-[#002855]">
                          <span className="text-xs font-bold uppercase tracking-wider">{month}</span>
                          <span className="text-xl font-bold leading-none">{day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-gray-900 truncate">{event.title}</h3>
                            <Badge variant="outline" className="shrink-0 text-[10px] uppercase font-semibold text-gray-500">
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" /> {event.time} • {event.isOnline ? 'Online' : 'In-person'}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={event.speaker.avatar} />
                                <AvatarFallback className="text-[10px]">{getInitials(event.speaker.name)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-600">{event.speaker.name}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-[#002855] px-2">RSVP</Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Opportunities */}
              <div>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-2xl font-bold text-[#002855]">Latest Opportunities</h2>
                  <Link href="/opportunities" className="text-sm text-[#002855] font-medium hover:underline">View all</Link>
                </div>
                <div className="space-y-4">
                  {latestOpportunities.map((opp) => {
                    let typeColor = "bg-gray-100 text-gray-800";
                    if (opp.type === "Internship") typeColor = "bg-blue-100 text-blue-800";
                    if (opp.type === "Full-time Job") typeColor = "bg-green-100 text-green-800";
                    if (opp.type === "Referral") typeColor = "bg-red-100 text-red-800";

                    return (
                      <div key={opp.id} className="p-5 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{opp.title}</h3>
                          <Badge className={`${typeColor} border-0 shadow-none hover:${typeColor}`}>{opp.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1 font-medium text-gray-700">
                            <Building2 className="w-4 h-4" /> {opp.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {opp.location}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Posted by</span>
                            <span className="text-xs font-medium text-gray-700">{opp.postedBy.name}</span>
                          </div>
                          <Link href="/opportunities" className="text-sm font-medium text-[#002855] flex items-center hover:underline">
                            Details <ArrowRight className="ml-1 w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 7: Discussions */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#002855] mb-3">Trending Discussions</h2>
              <p className="text-gray-600 text-lg">Join the conversation with the NSUT community.</p>
            </div>
            
            <div className="space-y-4">
              {trendingDiscussions.map((post) => (
                <Card key={post.id} className="border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
                  <div className="flex p-5 gap-4">
                    <div className="flex flex-col items-center gap-1 text-gray-500 min-w-12">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#002855] hover:bg-blue-50">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-bold text-gray-700">{post.upvotes}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0 h-5">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/forum/${post.id}`} className="block">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-[#002855] truncate">{post.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-600 line-clamp-1 mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={post.authorAvatar} />
                            <AvatarFallback className="text-[8px]">{getInitials(post.authorName)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-gray-700">{post.authorName}</span>
                        </div>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5"/> {post.replies.length} replies</span>
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5"/> {post.views} views</span>
                        <span className="hidden sm:inline">• {formatRelativeTime(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="border-[#002855] text-[#002855]" asChild>
                <Link href="/forum">Explore Forum</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 8: CTA */}
        <section className="py-24 bg-[#002855] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Connect with NSUT Alumni?</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join the largest alumni network of NSUT. Whether you are a student seeking guidance or an alumnus wanting to give back — there is a place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#002855] hover:bg-gray-100 font-semibold rounded-md text-base px-8" asChild>
                <Link href="/register">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-md text-base px-8" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
