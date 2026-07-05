import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return formatDate(dateStr);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function getBranchFullName(branch: string): string {
  const branchNames: Record<string, string> = {
    CSE: "Computer Science & Engineering",
    IT: "Information Technology",
    ECE: "Electronics & Communication Engineering",
    EE: "Electrical Engineering",
    ME: "Mechanical Engineering",
    ICE: "Instrumentation & Control Engineering",
    BT: "Biotechnology",
    MPAE: "Manufacturing Process & Automation Engineering",
    CE: "Civil Engineering",
    MAC: "Mathematics & Computing",
  };
  return branchNames[branch] || branch;
}

export function getAvailabilityColor(status: string): string {
  switch (status) {
    case "available":
      return "text-green-700 bg-green-50 border-green-200";
    case "busy":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "unavailable":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "pending":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "accepted":
      return "text-green-700 bg-green-50 border-green-200";
    case "completed":
      return "text-blue-700 bg-blue-50 border-blue-200";
    case "declined":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
}
