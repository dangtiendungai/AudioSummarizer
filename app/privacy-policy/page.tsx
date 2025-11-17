import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Audio Summarizer AI ("we," "our," or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                use our audio transcription and summarization service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2.1 Account Information
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you create an account, we collect:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Email address</li>
                <li>Display name (optional)</li>
                <li>Password (encrypted and never stored in plaintext)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2.2 Audio Content
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you upload audio files or provide YouTube links, we
                process:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Audio files you upload</li>
                <li>YouTube video URLs you provide</li>
                <li>Generated transcripts and summaries</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2.3 Usage Data
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We automatically collect information about how you use our
                service, including timestamps, feature usage, and error logs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process audio transcriptions and generate summaries</li>
                <li>Authenticate your account and manage your sessions</li>
                <li>Store your transcripts and summaries for your access</li>
                <li>Send you service-related notifications</li>
                <li>Respond to your inquiries and support requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                4. Data Storage and Security
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your
                data:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>
                  All passwords are encrypted using secure hashing algorithms
                </li>
                <li>
                  Data is stored in secure databases with access controls
                </li>
                <li>
                  Audio files and transcripts are processed securely and stored
                  with encryption
                </li>
                <li>
                  We use Row-Level Security (RLS) to ensure users can only
                  access their own data
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                5. Third-Party Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>
                  <strong>OpenAI:</strong> For audio transcription and AI-powered
                  summarization. Audio files are processed according to OpenAI's
                  privacy policy.
                </li>
                <li>
                  <strong>Supabase:</strong> For authentication and database
                  storage. Data is stored securely in Supabase's infrastructure.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                6. Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Access your personal data and transcripts</li>
                <li>Update or correct your account information</li>
                <li>Delete your account and associated data</li>
                <li>Export your transcripts and summaries</li>
                <li>Request information about how we process your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                7. Data Retention
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your data for as long as your account is active or as
                needed to provide our services. You can delete your account and
                all associated data at any time through your profile settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                8. Children's Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our service is not intended for users under the age of 13. We do
                not knowingly collect personal information from children under
                13. If you believe we have collected information from a child
                under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:dangtiendung.ai@outlook.com"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  dangtiendung.ai@outlook.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

