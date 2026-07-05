"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MessageSquare, ThumbsUp, Eye, Search, Flame, Clock, 
  TrendingUp, Plus, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { forumPosts } from "@/lib/data/mock-data";
import { getInitials, formatRelativeTime, cn } from "@/lib/utils";

const CATEGORIES = ["All", "Career", "Coding", "Core Engineering", "Research", "MBA", "Government Exams", "General"];

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"hot" | "new" | "top">("hot");

  let filteredPosts = forumPosts;
  if (activeCategory !== "All") {
    filteredPosts = forumPosts.filter(p => p.category === activeCategory);
  }

  // Sort logic
  filteredPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    if (sortBy === "top") return b.upvotes - a.upvotes;
    if (sortBy === "new") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    // hot: simple proxy using upvotes + recentness
    return (b.upvotes + b.replies.length * 2) - (a.upvotes + a.replies.length * 2);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#002855]">Community Forum</h1>
          <p className="text-gray-600 text-sm mt-1">Ask questions, share experiences, and connect with peers.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#002855] text-white hover:bg-[#001f42]">
              <Plus className="w-4 h-4 mr-2" /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create a New Post</DialogTitle>
              <DialogDescription>
                Share your thoughts, ask questions, or provide updates to the community.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Keep it clear and concise..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.filter(c => c !== "All").map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Elaborate on your topic here..." 
                  className="h-32 resize-none"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (optional)</Label>
                <Input id="tags" placeholder="e.g. placements, gate, ms (comma separated)" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="anonymous" className="rounded border-gray-300 text-[#002855] focus:ring-[#002855]" />
                <Label htmlFor="anonymous" className="font-normal text-sm">Post anonymously</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-[#002855] text-white">Post to Forum</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="lg:w-3/4 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full overflow-x-auto">
              <TabsList className="bg-transparent h-auto p-0 flex flex-nowrap w-max">
                {CATEGORIES.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-[#002855] data-[state=active]:text-white rounded-full px-4 py-1.5 mr-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 shadow-none"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-2 px-2 py-1 bg-white rounded-lg border border-gray-100 w-fit text-sm">
            <button 
              onClick={() => setSortBy("hot")}
              className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors", sortBy === "hot" ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700")}
            >
              <Flame className="w-3.5 h-3.5" /> Hot
            </button>
            <button 
              onClick={() => setSortBy("new")}
              className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors", sortBy === "new" ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700")}
            >
              <Clock className="w-3.5 h-3.5" /> New
            </button>
            <button 
              onClick={() => setSortBy("top")}
              className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors", sortBy === "top" ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700")}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Top
            </button>
          </div>

          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex p-4 gap-4">
                  {/* Upvote Column */}
                  <div className="flex flex-col items-center gap-1 text-gray-500 min-w-12 pt-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#002855] hover:bg-blue-50 rounded-full">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-bold text-gray-700">{post.upvotes}</span>
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <Link href={`/forum/${post.id}`} className="block group">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#002855] transition-colors leading-tight">
                          {post.title}
                        </h3>
                      </Link>
                      {post.isPinned && (
                        <Badge variant="secondary" className="shrink-0 bg-blue-50 text-blue-700 border-blue-200 text-[10px] uppercase font-bold py-0.5">
                          Pinned
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      <Badge variant="outline" className="bg-gray-50 text-gray-600 text-[10px] font-normal border-gray-200 py-0 h-5">
                        {post.category}
                      </Badge>
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {post.content}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-5 w-5">
                          {post.isAnonymous ? (
                            <AvatarFallback className="bg-gray-200"><User className="w-3 h-3 text-gray-500"/></AvatarFallback>
                          ) : (
                            <>
                              <AvatarImage src={post.authorAvatar} />
                              <AvatarFallback className="bg-gray-200 text-gray-700 text-[8px]">{getInitials(post.authorName)}</AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <span className={cn("font-medium", post.authorRole === 'alumni' ? 'text-[#002855]' : 'text-gray-700')}>
                          {post.isAnonymous ? 'Anonymous' : post.authorName}
                        </span>
                        {!post.isAnonymous && post.authorRole === 'alumni' && (
                          <Badge variant="outline" className="text-[9px] py-0 h-4 px-1 border-blue-200 text-blue-700 bg-blue-50">Alumni</Badge>
                        )}
                      </div>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5"/> {post.replies.length}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5"/> {post.views}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {formatRelativeTime(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No posts found in this category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 space-y-4">
          <Card className="bg-white border-gray-100 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Search Forum</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search..." className="pl-8 bg-gray-50 border-gray-200 h-9" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-100 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#002855] mb-3 border-b pb-2">Forum Guidelines</h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                <li>Be respectful and professional.</li>
                <li>Search before posting to avoid duplicates.</li>
                <li>Use appropriate tags to categorize your post.</li>
                <li>No spam or self-promotion.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
