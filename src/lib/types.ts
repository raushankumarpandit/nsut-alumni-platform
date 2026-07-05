// ============================================================
// NSUT Alumni Mentorship Platform — Type Definitions
// ============================================================

// --- User & Profile Types ---

export type UserRole = "student" | "alumni" | "admin";

export type AvailabilityStatus = "available" | "busy" | "unavailable";

export type VerificationStatus = "verified" | "pending" | "unverified";

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  website?: string;
  twitter?: string;
}

export interface Alumni {
  id: string;
  name: string;
  email: string;
  avatar: string;
  graduationYear: number;
  branch: Branch;
  currentCompany: string;
  role: string;
  domain: Domain;
  yearsOfExperience: number;
  location: string;
  country: string;
  bio: string;
  skills: string[];
  availability: AvailabilityStatus;
  verificationStatus: VerificationStatus;
  socialLinks: SocialLinks;
  achievements?: string[];
  isHigherStudies: boolean;
  university?: string;
  mentorshipCount: number;
  rating: number;
  joinedAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  currentYear: number;
  branch: Branch;
  interests: Domain[];
  careerGoals: string;
  savedMentors: string[];
  joinedAt: string;
}

// --- Enums / Union Types ---

export type Branch =
  | "CSE"
  | "ECE"
  | "IT"
  | "EE"
  | "ME"
  | "ICE"
  | "BT"
  | "MPAE"
  | "CE"
  | "MAC";

export type Domain =
  | "Software Engineering"
  | "Data Science & AI/ML"
  | "Core Engineering"
  | "UPSC & Government"
  | "Research & Academia"
  | "MBA & Management"
  | "Startups & Entrepreneurship"
  | "Product Management"
  | "Consulting"
  | "Finance & Quant"
  | "Design & UX"
  | "Cybersecurity"
  | "Cloud & DevOps"
  | "Blockchain & Web3";

// --- Mentorship Types ---

export type MentorshipTopic =
  | "Career Guidance"
  | "Higher Studies"
  | "Placements"
  | "Resume Review"
  | "Startups"
  | "Research"
  | "Interview Prep"
  | "Domain Switch";

export type MentorshipStatus = "pending" | "accepted" | "completed" | "declined";

export interface MentorshipRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  alumniId: string;
  alumniName: string;
  alumniAvatar: string;
  topic: MentorshipTopic;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: MentorshipStatus;
  createdAt: string;
  updatedAt: string;
}

// --- Forum Types ---

export type ForumCategory =
  | "Career"
  | "Coding"
  | "Core Engineering"
  | "Research"
  | "MBA"
  | "Government Exams"
  | "General";

export interface ForumReply {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  content: string;
  upvotes: number;
  createdAt: string;
  isAnonymous: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  category: ForumCategory;
  tags: string[];
  upvotes: number;
  replies: ForumReply[];
  isAnonymous: boolean;
  isPinned: boolean;
  createdAt: string;
  views: number;
}

// --- Opportunity Types ---

export type OpportunityType =
  | "Internship"
  | "Full-time Job"
  | "Research"
  | "Startup Hiring"
  | "Referral";

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: OpportunityType;
  location: string;
  isRemote: boolean;
  description: string;
  requirements: string[];
  applicationLink: string;
  postedBy: {
    id: string;
    name: string;
    avatar: string;
    batch: number;
  };
  deadline?: string;
  createdAt: string;
  applicants: number;
}

// --- Event Types ---

export type EventType =
  | "Alumni Meetup"
  | "Webinar"
  | "Hackathon"
  | "Networking Session"
  | "Guest Lecture"
  | "Workshop"
  | "AMA";

export interface PlatformEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  time: string;
  duration: string;
  location: string;
  isOnline: boolean;
  meetingLink?: string;
  speaker: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
  rsvpCount: number;
  maxCapacity?: number;
  tags: string[];
  coverImage?: string;
  createdAt: string;
}

// --- Story Types ---

export type StoryCategory =
  | "Success Story"
  | "Startup Journey"
  | "UPSC Journey"
  | "Research Publication"
  | "International Placement"
  | "Campus to Corporate";

export interface AlumniStory {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: StoryCategory;
  author: {
    id: string;
    name: string;
    avatar: string;
    batch: number;
    branch: Branch;
    currentRole: string;
    company: string;
  };
  coverImage?: string;
  readTime: number;
  likes: number;
  createdAt: string;
  featured: boolean;
}

// --- Resource Types ---

export type ResourceCategory =
  | "Interview Prep"
  | "Resume Templates"
  | "Placement Roadmaps"
  | "Higher Studies"
  | "GATE Resources"
  | "Research Papers"
  | "Coding Practice"
  | "General";

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  link: string;
  fileType: "pdf" | "doc" | "link" | "video" | "repo";
  uploadedBy: {
    id: string;
    name: string;
    avatar: string;
    batch: number;
  };
  upvotes: number;
  downloads: number;
  createdAt: string;
}

// --- Network / Analytics Types ---

export interface CompanyDistribution {
  company: string;
  count: number;
  color: string;
}

export interface CountryDistribution {
  country: string;
  count: number;
  code: string;
}

export interface BranchDistribution {
  branch: Branch;
  count: number;
  color: string;
}

// --- Admin Types ---

export interface AdminStats {
  totalAlumni: number;
  totalStudents: number;
  activeMentors: number;
  sessionsBooked: number;
  sessionsCompleted: number;
  forumPosts: number;
  forumReplies: number;
  opportunitiesPosted: number;
  eventsHosted: number;
  popularDomains: { domain: Domain; count: number }[];
  monthlySignups: { month: string; alumni: number; students: number }[];
  engagementByWeek: { week: string; mentorships: number; posts: number; replies: number }[];
}

// --- Search Types ---

export type SearchResultType =
  | "alumni"
  | "forum"
  | "opportunity"
  | "event"
  | "resource"
  | "story";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  url: string;
  icon?: string;
}

// --- Notification Types ---

export type NotificationType =
  | "mentorship_request"
  | "mentorship_accepted"
  | "mentorship_declined"
  | "forum_reply"
  | "new_opportunity"
  | "event_reminder"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}
