"use client";

import { use, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, ThumbsUp, MessageSquare, Eye, Clock, 
  MoreVertical, Flag, Share2, CornerDownRight, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { forumPosts } from "@/lib/data/mock-data";
import { getInitials, formatRelativeTime, cn } from "@/lib/utils";

export default function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const post = forumPosts.find(p => p.id === unwrappedParams.id);
  const [replyContent, setReplyContent] = useState("");

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
        <p className="text-gray-500 mb-6">The discussion you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button asChild className="bg-[#002855]">
          <Link href="/forum">Back to Forum</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" asChild className="text-gray-500 hover:text-[#002855] -ml-4">
        <Link href="/forum"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Forum</Link>
      </Button>

      {/* Main Post */}
      <Card className="bg-white border-gray-200 shadow-sm overflow-hidden">
        <div className="flex p-5 sm:p-6 gap-4 sm:gap-6">
          {/* Upvote Column */}
          <div className="flex flex-col items-center gap-1 text-gray-500 min-w-12 hidden sm:flex">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-[#002855] hover:bg-blue-50 rounded-full">
              <ThumbsUp className="h-5 w-5" />
            </Button>
            <span className="text-base font-bold text-gray-700">{post.upvotes}</span>
          </div>

          {/* Content Column */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4 text-sm">
              <Avatar className="h-10 w-10">
                {post.isAnonymous ? (
                  <AvatarFallback className="bg-gray-200"><User className="w-5 h-5 text-gray-500"/></AvatarFallback>
                ) : (
                  <>
                    <AvatarImage src={post.authorAvatar} />
                    <AvatarFallback className="bg-gray-200 text-gray-700">{getInitials(post.authorName)}</AvatarFallback>
                  </>
                )}
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className={cn("font-semibold", post.authorRole === 'alumni' ? 'text-[#002855]' : 'text-gray-900')}>
                    {post.isAnonymous ? 'Anonymous' : post.authorName}
                  </span>
                  {!post.isAnonymous && post.authorRole === 'alumni' && (
                    <Badge variant="outline" className="text-[10px] py-0 h-4 px-1.5 border-blue-200 text-blue-700 bg-blue-50">Alumni</Badge>
                  )}
                  {post.authorRole === 'admin' && (
                    <Badge variant="outline" className="text-[10px] py-0 h-4 px-1.5 border-red-200 text-red-700 bg-red-50">Admin</Badge>
                  )}
                </div>
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {formatRelativeTime(post.createdAt)}
                </span>
              </div>
              
              <div className="ml-auto flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Share2 className="w-4 h-4 mr-2" /> Share</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 focus:text-red-600"><Flag className="w-4 h-4 mr-2" /> Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="mb-2">
              <Badge variant="outline" className="bg-gray-50 text-gray-600 text-xs font-medium border-gray-200 mr-2 mb-2">
                {post.category}
              </Badge>
              {post.tags.map(tag => (
                <span key={tag} className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded mr-2 mb-2 inline-block">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>

            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100 sm:hidden">
              <Button variant="ghost" size="sm" className="text-gray-500 gap-1.5 px-2">
                <ThumbsUp className="h-4 w-4" /> {post.upvotes}
              </Button>
              <span className="text-gray-400 text-sm flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4"/> {post.replies.length}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1.5">
                <Eye className="w-4 h-4"/> {post.views}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Replies Section */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gray-900 px-1">{post.replies.length} Replies</h3>
        
        {/* Reply Form */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4 sm:p-5">
            <Textarea 
              placeholder="Write a reply..." 
              className="resize-none border-gray-200 focus-visible:ring-[#002855] min-h-[100px] mb-3"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="reply-anonymous" className="rounded border-gray-300 text-[#002855] focus:ring-[#002855]" />
                <Label htmlFor="reply-anonymous" className="font-normal text-sm text-gray-600">Reply anonymously</Label>
              </div>
              <Button className="bg-[#002855] text-white hover:bg-[#001f42]" disabled={!replyContent.trim()}>
                Post Reply
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Replies List */}
        <div className="space-y-4">
          {post.replies.map((reply) => (
            <Card key={reply.id} className="bg-white border-gray-100 shadow-sm">
              <CardContent className="p-4 sm:p-5">
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex flex-col items-center gap-1 min-w-8 pt-1">
                    <button className="text-gray-400 hover:text-[#002855] p-1 rounded hover:bg-blue-50">
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-xs font-semibold text-gray-600">{reply.upvotes}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn("font-medium text-sm", reply.authorRole === 'alumni' ? 'text-[#002855]' : 'text-gray-900')}>
                        {reply.authorName}
                      </span>
                      {reply.authorRole === 'alumni' && (
                        <Badge variant="outline" className="text-[9px] py-0 h-3.5 px-1 border-blue-200 text-blue-700 bg-blue-50">Alumni</Badge>
                      )}
                      <span className="text-gray-400 text-xs flex items-center gap-1 ml-2">
                        {formatRelativeTime(reply.createdAt)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {reply.content}
                    </div>
                    <div className="mt-3">
                      <button className="text-xs text-gray-500 font-medium hover:text-[#002855] flex items-center gap-1 transition-colors">
                        <CornerDownRight className="w-3 h-3" /> Reply to thread
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
