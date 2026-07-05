"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Heart, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { alumniStories } from "@/lib/data/mock-data";
import { getInitials } from "@/lib/utils";

const CATEGORIES = ["All", "Success Story", "Startup Journey", "UPSC Journey", "International Placement", "Campus to Corporate"];

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredStories = alumniStories.filter(story => 
    activeCategory === "All" || story.category === activeCategory
  );

  const featuredStory = filteredStories.find(s => s.featured) || filteredStories[0];
  const remainingStories = filteredStories.filter(s => s.id !== featuredStory?.id);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-3xl font-bold text-[#002855] mb-2">Alumni Stories</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Read inspiring journeys, lessons learned, and career advice directly from NSUT graduates.
        </p>
      </div>

      <div className="flex items-center justify-center pb-2">
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full max-w-4xl overflow-x-auto">
          <TabsList className="bg-transparent h-auto p-0 flex flex-nowrap w-max mx-auto">
            {CATEGORIES.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="data-[state=active]:bg-[#002855] data-[state=active]:text-white rounded-full px-4 py-1.5 mx-1 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 shadow-none"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {featuredStory && activeCategory === "All" && (
        <Card className="bg-white border-gray-200 shadow-md overflow-hidden flex flex-col md:flex-row group cursor-pointer hover:shadow-lg transition-all">
          <div className="md:w-1/3 bg-gray-100 min-h-[250px] relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#002855]/80 to-[#DA291C]/80 flex items-center justify-center p-6 text-center">
              <h3 className="text-2xl font-bold text-white tracking-wide">{featuredStory.title}</h3>
            </div>
          </div>
          <div className="md:w-2/3 p-6 md:p-8 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <Badge variant="outline" className="bg-blue-50 text-[#002855] border-blue-200">
                Featured • {featuredStory.category}
              </Badge>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {featuredStory.readTime} min read</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#002855] transition-colors">
              {featuredStory.title}
            </h2>
            
            <p className="text-gray-600 mb-6 line-clamp-3 text-lg">
              {featuredStory.excerpt}
            </p>
            
            <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={featuredStory.author.avatar} />
                  <AvatarFallback className="bg-gray-200 text-gray-700">{getInitials(featuredStory.author.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{featuredStory.author.name}</p>
                  <p className="text-xs text-gray-500">{featuredStory.author.currentRole} @ {featuredStory.author.company}</p>
                </div>
              </div>
              <span className="flex items-center font-medium text-[#002855] text-sm">
                Read full story <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeCategory === "All" ? remainingStories : filteredStories).map((story) => {
          let badgeColor = "bg-gray-100 text-gray-800";
          if (story.category === "Success Story") badgeColor = "bg-green-100 text-green-800";
          if (story.category === "UPSC Journey") badgeColor = "bg-amber-100 text-amber-800";
          if (story.category === "Startup Journey") badgeColor = "bg-purple-100 text-purple-800";
          if (story.category === "International Placement") badgeColor = "bg-blue-100 text-blue-800";

          return (
            <Card key={story.id} className="border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col h-full bg-white group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="mb-3 flex justify-between items-start">
                  <Badge className={`${badgeColor} hover:${badgeColor} border-0 shadow-none text-xs`}>
                    {story.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5"/> {story.readTime}m
                  </span>
                </div>
                <CardTitle className="text-xl leading-tight group-hover:text-[#002855] transition-colors">
                  {story.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {story.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={story.author.avatar} />
                      <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                        {getInitials(story.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900 leading-none mb-1">{story.author.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-semibold">{story.author.branch} &apos;{story.author.batch}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Heart className="w-3.5 h-3.5"/> {story.likes}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No stories found in this category yet.</p>
        </div>
      )}
    </div>
  );
}
