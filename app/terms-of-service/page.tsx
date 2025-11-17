import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Audio Summarizer AI ("the Service"), you
                accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Audio Summarizer AI provides AI-powered audio transcription and
                summarization services. Users can upload audio files or provide
                YouTube video links to receive transcripts, summaries, key
                points, and action items.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                3. User Accounts
              </h2>
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.1 Account Creation
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use certain features of the Service, you must create an
                account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as necessary</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.2 Account Security
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                4. Acceptable Use
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>
                  Upload content that violates any laws, regulations, or third-party rights
                </li>
                <li>
                  Upload copyrighted material without proper authorization
                </li>
                <li>
                  Use the Service for any illegal or unauthorized purpose
                </li>
                <li>
                  Attempt to gain unauthorized access to the Service or its systems
                </li>
                <li>
                  Interfere with or disrupt the Service or servers connected to it
                </li>
                <li>
                  Upload malicious code, viruses, or harmful software
                </li>
                <li>
                  Use automated systems to access the Service without permission
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                5. Content and Intellectual Property
              </h2>
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.1 Your Content
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You retain ownership of any content you upload. By uploading
                content, you grant us a license to process, transcribe, and
                summarize your content solely for the purpose of providing the
                Service to you.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5.2 Our Content
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The Service, including its original content, features, and
                functionality, is owned by Audio Summarizer AI and is protected
                by international copyright, trademark, and other intellectual
                property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                6. Service Availability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide reliable service but do not guarantee
                uninterrupted or error-free operation. The Service may be
                temporarily unavailable due to maintenance, updates, or
                unforeseen circumstances. We reserve the right to modify,
                suspend, or discontinue the Service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>
                  The Service is provided "as is" without warranties of any kind
                </li>
                <li>
                  We are not liable for any indirect, incidental, or consequential damages
                </li>
                <li>
                  We are not responsible for the accuracy of AI-generated transcripts or summaries
                </li>
                <li>
                  You use the Service at your own risk
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                8. Indemnification
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify and hold harmless Audio Summarizer AI,
                its officers, directors, employees, and agents from any claims,
                damages, losses, liabilities, and expenses arising from your use
                of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                9. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your account and access to the
                Service immediately, without prior notice, for any reason,
                including if you breach these Terms. Upon termination:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Your right to use the Service will immediately cease</li>
                <li>You may request deletion of your data</li>
                <li>We may delete your account and associated data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will
                notify users of any material changes by posting the updated
                Terms on this page and updating the "Last updated" date. Your
                continued use of the Service after such changes constitutes
                acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                11. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with applicable laws, without regard to conflict of law
                provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                12. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please
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

