"use client";

import { useState } from "react";
import { 
  CalendarDays, MapPin, Clock, Users, 
  Video, Globe, Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { events } from "@/lib/data/mock-data";
import { getInitials } from "@/lib/utils";

export default function EventsPage() {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  const today = new Date().toISOString().split("T")[0];
  const filteredEvents = events.filter(e => filter === "upcoming" ? e.date >= today : e.date < today);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#002855]">Events & Webinars</h1>
          <p className="text-gray-600 text-sm mt-1">Join technical workshops, AMAs, and networking meetups.</p>
        </div>
        
        <div className="bg-gray-100 p-1 rounded-lg border border-gray-200 inline-flex">
          <button
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === "upcoming" ? "bg-white text-[#002855] shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === "past" ? "bg-white text-[#002855] shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
            onClick={() => setFilter("past")}
          >
            Past Events
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => {
          const eventDate = new Date(event.date);
          const month = eventDate.toLocaleString('default', { month: 'short' });
          const day = eventDate.getDate();
          const dayOfWeek = eventDate.toLocaleString('default', { weekday: 'long' });
          
          let typeColor = "bg-gray-100 text-gray-800 border-gray-200";
          if (event.type === "AMA") typeColor = "bg-blue-50 text-blue-700 border-blue-200";
          if (event.type === "Alumni Meetup") typeColor = "bg-green-50 text-green-700 border-green-200";
          if (event.type === "Workshop") typeColor = "bg-purple-50 text-purple-700 border-purple-200";
          if (event.type === "Webinar") typeColor = "bg-indigo-50 text-indigo-700 border-indigo-200";

          return (
            <Card key={event.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Date Block */}
                <div className="md:w-48 bg-gray-50 border-r border-gray-100 flex md:flex-col items-center justify-center p-6 gap-2 md:gap-0">
                  <span className="text-sm font-bold uppercase tracking-widest text-red-600">{month}</span>
                  <span className="text-4xl md:text-5xl font-black text-gray-900 leading-none my-1">{day}</span>
                  <span className="text-sm text-gray-500 font-medium">{dayOfWeek}</span>
                </div>
                
                {/* Content Block */}
                <CardContent className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={`${typeColor} text-xs font-semibold shadow-none uppercase`}>
                          {event.type}
                        </Badge>
                        {event.isOnline ? (
                          <span className="flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            <Video className="w-3 h-3 mr-1" /> Online
                          </span>
                        ) : (
                          <span className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                            <MapPin className="w-3 h-3 mr-1" /> In-person
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed max-w-2xl">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-4 h-4 text-gray-400" /> {event.time} ({event.duration})
                        </span>
                        {!event.isOnline && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gray-400" /> {event.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-gray-400" /> {event.rsvpCount} {event.maxCapacity ? `/ ${event.maxCapacity} Registered` : 'Registered'}
                        </span>
                      </div>
                    </div>

                    <div className="w-full md:w-auto mt-4 md:mt-0 shrink-0 flex flex-col items-end gap-3">
                      {filter === "upcoming" ? (
                        <Button className="w-full md:w-32 bg-[#002855] text-white hover:bg-[#001f42]">
                          RSVP Now
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full md:w-32">
                          View Recording
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker</span>
                      <div className="flex items-center gap-2 bg-gray-50 pr-4 rounded-full border border-gray-100">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={event.speaker.avatar} />
                          <AvatarFallback className="text-[10px]">{getInitials(event.speaker.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-bold text-gray-900">{event.speaker.name}</p>
                          <p className="text-[10px] text-gray-500">{event.speaker.role} @ {event.speaker.company}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {event.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No {filter} events found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
