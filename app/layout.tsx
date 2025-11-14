import type { Metadata } from "next";
import { Sarala } from "next/font/google";
import "./globals.css";

const sarala = Sarala({
  weight: ["400", "700"],
  variable: "--font-sarala",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audio Summarizer AI",
  description:
    "Transcribe audio files and YouTube videos, then get AI-powered summaries, notes, and action items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sarala.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
