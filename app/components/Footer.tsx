import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Audio Summarizer AI
            </h3>
            <p className="text-gray-600 text-sm">
              Transform your audio content into actionable insights with
              AI-powered transcription and summarization.
            </p>
          </div>

          {/* Product */}
          <div> 
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/summarize"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Summarize Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/forgot-password"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Forgot Password
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 text-sm mb-2">
            © 2025 Audio Summarizer AI. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Powered by OpenAI Whisper and advanced LLM technology
          </p>
        </div>
      </div>
    </footer>
  );
}
