"use client";

import Link from "next/link";
import Button from "./Button";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Audio Summarizer AI
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
