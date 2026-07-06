import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#002855] tracking-tight sm:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <p>
            Welcome to the NSUT Alumni Network mentorship and collaboration platform. By accessing or using our website, you agree to comply with and be bound by these Terms of Service.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
            <p>
              This platform is designed specifically for students, alumni, and faculty of Netaji Subhas University of Technology (NSUT). By creating an account or using our services, you confirm that you are affiliated with NSUT and agree to these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">2. Account Registration and Eligibility</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Student Accounts:</strong> Must register using their official `@nsut.ac.in` email address. Accounts created with generic email addresses will be rejected.
              </li>
              <li>
                <strong>Alumni Accounts:</strong> Are subject to verification by the administration. You must provide valid details, including your graduation year and LinkedIn URL, to confirm your status.
              </li>
              <li>
                <strong>Account Responsibility:</strong> You are responsible for keeping your credentials confidential and for all actions occurring under your account.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">3. Platform Conduct & Mentorship</h2>
            <p>
              The platform is created to provide career guidance, mentorship, and professional networking. Users agree that they will:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Maintain high professional ethics and respect in all mentorship sessions and messaging.</li>
              <li>Not spam mentors or request financial support or loans.</li>
              <li>Not post offensive, hateful, or commercial promotional content on the Community Forums.</li>
              <li>Honor confirmed mentorship session schedules or cancel with reasonable advance notice.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">4. Moderation & Termination</h2>
            <p>
              The platform administrators reserve the right to review reported profiles, post contents, or session feedback, and to temporarily suspend or permanently terminate accounts that violate these terms or behave in an unprofessional manner.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">5. Limitation of Liability</h2>
            <p>
              Mentorship advice is provided voluntarily by alumni and does not guarantee job placements, grades, or specific career outcomes. NSUT does not assume liability for external decisions made based on interactions on this platform.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
