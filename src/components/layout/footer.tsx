import Link from "next/link";
import { Globe, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Branding */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/NSUT_logo.png" alt="NSUT Logo" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold text-[#002855]">
                NSUT <span className="font-normal text-gray-600">Alumni</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              The official alumni mentorship platform for Netaji Subhas University of Technology. Connecting generations of NSUTians worldwide.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#002855] tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">Home</Link></li>
              <li><Link href="/directory" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">Alumni Directory</Link></li>
              <li><Link href="/mentorship" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">Mentorship</Link></li>
              <li><Link href="/forum" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">Community Forum</Link></li>
              <li><Link href="/opportunities" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">Opportunities</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-[#002855] tracking-wider uppercase mb-4">Resources & More</h3>
            <ul className="space-y-3">
              <li><Link href="/resources" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">Resource Hub</Link></li>
              <li><Link href="/events" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">Events & Webinars</Link></li>
              <li><Link href="/stories" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">Alumni Stories</Link></li>
              <li><Link href="/network" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">Network Graph</Link></li>
              <li><Link href="/admin" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[#002855] tracking-wider uppercase mb-4">Connect With Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">Sector 3, Dwarka<br/>New Delhi - 110078</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                <a href="mailto:alumni@nsut.ac.in" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">alumni@nsut.ac.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400 shrink-0" />
                <a href="https://nsut.ac.in" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-[#002855] transition-colors">www.nsut.ac.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500 text-center md:text-left space-y-1">
            <p>&copy; {new Date().getFullYear()} NSUT Alumni Network. Built for the NSUT community.</p>
            <div className="flex justify-center md:justify-start gap-3 mt-1 text-xs">
              <Link href="/privacy" className="hover:underline hover:text-[#002855] transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:underline hover:text-[#002855] transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://linkedin.com/school/netaji-subhas-university-of-technology/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0A66C2] transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://github.com/netaji-subhas-university-of-technology" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
