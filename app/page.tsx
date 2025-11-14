"use client";

import Link from "next/link";
import Button from "./components/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            Audio Summarizer AI
          </div>
          <Link href="/summarize">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Audio into
            <span className="text-blue-600"> Actionable Insights</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Upload audio files or YouTube videos and get instant AI-powered
            transcripts, summaries, key points, and action items. Save hours of
            note-taking time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/summarize">
              <Button variant="primary" className="text-lg px-8 py-4">
                Start Summarizing
              </Button>
            </Link>
            <Button variant="secondary" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to extract value from your audio content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Audio Transcription
            </h3>
            <p className="text-gray-600">
              Upload MP3, WAV, or other audio formats. Support for YouTube links
              coming soon. Powered by advanced speech recognition technology.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AI Summarization
            </h3>
            <p className="text-gray-600">
              Get concise summaries that capture the essence of your content.
              Perfect for quickly understanding long meetings or lectures.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Action Items
            </h3>
            <p className="text-gray-600">
              Automatically extract actionable tasks and key decisions from your
              audio. Never miss important follow-ups again.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Full Transcripts
            </h3>
            <p className="text-gray-600">
              Access complete, searchable transcripts of your audio. Perfect for
              reference and detailed analysis.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Fast Processing
            </h3>
            <p className="text-gray-600">
              Get results in minutes, not hours. Our optimized pipeline
              processes audio quickly while maintaining accuracy.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Smart RAG (Coming Soon)
            </h3>
            <p className="text-gray-600">
              Chat with your transcripts using AI. Ask questions and get instant
              answers from your stored audio content.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your audio into insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Upload Audio
            </h3>
            <p className="text-gray-600">
              Upload your audio file (MP3, WAV, M4A, OGG) or paste a YouTube
              URL. We support various audio formats.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AI Processing
            </h3>
            <p className="text-gray-600">
              Our AI transcribes your audio using advanced speech recognition,
              then generates summaries and extracts key insights.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Get Results
            </h3>
            <p className="text-gray-600">
              Receive your transcript, summary, bullet points, and action items.
              All ready to use and share.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Transform your audio content into actionable insights today
          </p>
          <Link href="/summarize">
            <Button
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              Start Summarizing Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 max-w-7xl border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="mb-2">
            © 2024 Audio Summarizer AI. All rights reserved.
          </p>
          <p className="text-sm">
            Powered by OpenAI Whisper and advanced LLM technology
          </p>
        </div>
      </footer>
    </div>
  );
}
