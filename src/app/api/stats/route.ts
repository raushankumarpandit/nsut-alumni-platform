import { NextResponse } from "next/server";
import { getUsers } from "@/lib/db";

export async function GET() {
  try {
    const users = getUsers();
    const alumniList = users.filter((u) => u.role === "alumni");
    const studentsList = users.filter((u) => u.role === "student");
    
    const totalAlumni = alumniList.length;
    const totalStudents = studentsList.length;
    
    // Calculate unique companies
    const companies = new Set(
      alumniList
        .map((u) => u.company?.trim())
        .filter(Boolean)
    );
    const totalCompanies = companies.size || 35; // fallback to seed count if empty

    // Calculate active mentors (verified alumni)
    const totalMentors = alumniList.filter((u) => u.verificationStatus === "verified").length;

    return NextResponse.json({
      alumni: totalAlumni,
      students: totalStudents,
      mentors: totalMentors,
      companies: totalCompanies,
      sessions: 450 + (totalAlumni - 16) * 5, // mock scaling session count with registrations
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 }
    );
  }
}
