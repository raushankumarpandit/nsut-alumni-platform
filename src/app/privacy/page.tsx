import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#002855] tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <p>
            At Netaji Subhas University of Technology (NSUT) Alumni Network, we respect your privacy and are committed to protecting it. This Privacy Policy describes how we collect, use, and process your personal data when you use our mentorship and alumni community platform.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">1. Information We Collect</h2>
            <p>We collect information to provide a better connecting experience for our community. This includes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Profile Information:</strong> When you register, we collect details like your name, email address, branch of study, graduation year, job title, company, and LinkedIn URL.
              </li>
              <li>
                <strong>Mentorship Data:</strong> Details about sessions requested, schedules confirmed, and feedback shared between students and mentors.
              </li>
              <li>
                <strong>Social Logins:</strong> If you use Google or LinkedIn authentication, we receive your basic public profile information (name, email, and photo) from those providers.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">2. How We Use Your Information</h2>
            <p>Your information is used to facilitate community activities, specifically to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Allow students to search and find appropriate mentors based on branch, domain, and experience.</li>
              <li>Verify the alumni status of registered graduates.</li>
              <li>Coordinate mentorship session scheduling.</li>
              <li>Send notifications regarding booking updates or forum activity.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">3. Data Sharing and Confidentiality</h2>
            <p>
              We do not sell, trade, or share your personal data with third-party advertisers. Your contact information (like email address) is only visible to active platform users when coordinating a session. We enforce that all community interactions remain respectful and aligned with NSUT&apos;s code of conduct.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">4. Your Rights and Choices</h2>
            <p>
              You can update your profile information at any time from your Account Settings. If you wish to delete your account and all associated data, please contact the platform administration at <a href="mailto:alumni@nsut.ac.in" className="text-[#002855] hover:underline font-semibold">alumni@nsut.ac.in</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">5. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please contact the NSUT Alumni Relations office at Dwarka, New Delhi or email us at <a href="mailto:alumni@nsut.ac.in" className="text-[#002855] hover:underline font-semibold">alumni@nsut.ac.in</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
