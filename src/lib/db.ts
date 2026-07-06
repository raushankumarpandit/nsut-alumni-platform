import fs from "fs";
import path from "path";
import { students, alumni } from "./data/mock-data";

export interface DBUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // Plain password for this local/simulated DB is fine, but we'll use simple representation
  role: "student" | "alumni" | "admin";
  avatar: string;
  branch: string;
  graduationYear: number;
  currentYear?: number;
  company?: string;
  roleTitle?: string;
  linkedin?: string;
  verificationStatus: "verified" | "pending" | "unverified";
  joinedAt: string;
}

// Locate DB path inside the project's src/lib/data folder
const DB_FILE = path.join(process.cwd(), "src/lib/data/db.json");

// In-memory cache as fallback for production/vercel serverless environment where file writing might fail
let memoryCache: DBUser[] | null = null;

function initializeDB(): DBUser[] {
  try {
    // Check if db.json exists, if so read and parse it
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data) as DBUser[];
    }
  } catch (e) {
    console.error("Error reading db.json, falling back to memory:", e);
  }

  // Pre-seed default users
  const seededUsers: DBUser[] = [
    {
      id: "admin-001",
      name: "Admin Moderator",
      email: "admin@nsut.ac.in",
      passwordHash: "admin123", // Predefined admin password
      role: "admin",
      avatar: "",
      branch: "CSE",
      graduationYear: 2015,
      verificationStatus: "verified",
      joinedAt: "2024-01-01",
    },
    // Seed Raushan Kumar
    {
      id: "stu-001",
      name: "Raushan Kumar",
      email: "raushan.2k22@nsut.ac.in",
      passwordHash: "password",
      role: "student",
      avatar: "/avatars/raushan.jpg",
      branch: "CSE",
      graduationYear: 2026,
      currentYear: 3,
      verificationStatus: "verified",
      joinedAt: "2024-08-01",
    },
  ];

  // Seed default students from mock-data
  students.forEach((stu) => {
    if (stu.email !== "raushan.2k22@nsut.ac.in") {
      seededUsers.push({
        id: stu.id,
        name: stu.name,
        email: stu.email,
        passwordHash: "password", // default password
        role: "student",
        avatar: stu.avatar || "",
        branch: stu.branch,
        graduationYear: stu.currentYear ? (2023 + (4 - stu.currentYear)) : 2026,
        currentYear: stu.currentYear,
        verificationStatus: "verified",
        joinedAt: stu.joinedAt,
      });
    }
  });

  // Seed default alumni from mock-data
  alumni.forEach((alum) => {
    seededUsers.push({
      id: alum.id,
      name: alum.name,
      email: alum.email,
      passwordHash: "password", // default password
      role: "alumni",
      avatar: alum.avatar || "",
      branch: alum.branch,
      graduationYear: alum.graduationYear,
      company: alum.currentCompany,
      roleTitle: alum.role,
      linkedin: alum.socialLinks?.linkedin || "",
      verificationStatus: alum.verificationStatus,
      joinedAt: alum.joinedAt,
    });
  });

  // Attempt to write the seeded array to db.json
  try {
    const parentDir = path.dirname(DB_FILE);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(seededUsers, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write initial db.json:", e);
  }

  return seededUsers;
}

export function getUsers(): DBUser[] {
  if (memoryCache) return memoryCache;
  const users = initializeDB();
  memoryCache = users;
  return users;
}

export function saveUsers(users: DBUser[]) {
  memoryCache = users;
  try {
    const parentDir = path.dirname(DB_FILE);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save users to db.json (using memory cache):", e);
  }
}

export function getUserByEmail(email: string): DBUser | null {
  const users = getUsers();
  const lowerEmail = email.toLowerCase();
  return users.find((u) => u.email.toLowerCase() === lowerEmail) || null;
}

export function getUserById(id: string): DBUser | null {
  const users = getUsers();
  return users.find((u) => u.id === id) || null;
}

export function createUser(user: Omit<DBUser, "id" | "joinedAt" | "verificationStatus">): DBUser {
  const users = getUsers();
  
  // Assign simple incremental/unique ID
  const prefix = user.role === "student" ? "stu" : user.role === "admin" ? "admin" : "alum";
  const numStr = String(users.filter((u) => u.role === user.role).length + 1).padStart(3, "0");
  const id = `${prefix}-${numStr}-${Math.floor(100 + Math.random() * 900)}`;

  const newUser: DBUser = {
    ...user,
    id,
    verificationStatus: user.role === "alumni" ? "pending" : "verified",
    joinedAt: new Date().toISOString().split("T")[0],
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function updateUserVerification(id: string, status: "verified" | "pending" | "unverified"): DBUser | null {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index].verificationStatus = status;
  saveUsers(users);
  return users[index];
}
