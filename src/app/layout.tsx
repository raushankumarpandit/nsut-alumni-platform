import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NSUT Alumni Network — Connect Beyond Graduation",
  description:
    "The official alumni mentorship platform for Netaji Subhas University of Technology. Connect with alumni for mentorship, networking, internships, career guidance, and community building.",
  keywords: [
    "NSUT",
    "alumni",
    "mentorship",
    "networking",
    "Netaji Subhas University of Technology",
    "career guidance",
    "placements",
  ],
  openGraph: {
    title: "NSUT Alumni Network — Connect Beyond Graduation",
    description: "The official alumni mentorship platform for Netaji Subhas University of Technology.",
    url: "https://nsut-alumni-platform.vercel.app",
    siteName: "NSUT Alumni Network",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NSUT Alumni Network Link Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NSUT Alumni Network — Connect Beyond Graduation",
    description: "The official alumni mentorship platform for Netaji Subhas University of Technology.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
