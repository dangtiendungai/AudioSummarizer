"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { FileText, Search, Download, Eye, Calendar, Clock } from "lucide-react";

interface Transcript {
  id: string;
  title: string;
  type: "audio" | "youtube";
  duration: number;
  createdAt: string;
  wordCount: number;
  preview: string;
}

export default function TranscriptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "audio" | "youtube">("all");

  // Mock data - replace with actual API call
  const transcripts: Transcript[] = [
    {
      id: "1",
      title: "Team Meeting - Q4 Planning",
      type: "audio",
      duration: 3600,
      createdAt: "2025-01-15T10:30:00Z",
      wordCount: 5234,
      preview:
        "Good morning everyone. Let's start today's meeting by reviewing our Q4 objectives. As you all know, we have ambitious goals this quarter...",
    },
    {
      id: "2",
      title: "YouTube Video: AI Trends 2025",
      type: "youtube",
      duration: 1800,
      createdAt: "2025-01-14T14:20:00Z",
      wordCount: 3120,
      preview:
        "Welcome to today's discussion on AI trends for 2025. We'll be covering the latest developments in machine learning, natural language processing...",
    },
    {
      id: "3",
      title: "Client Call Recording",
      type: "audio",
      duration: 2400,
      createdAt: "2025-01-13T09:15:00Z",
      wordCount: 4567,
      preview:
        "Thank you for taking the time to meet with us today. We're excited to show you our latest product features and discuss how they can benefit your organization...",
    },
    {
      id: "4",
      title: "Podcast Episode: Tech Talk",
      type: "audio",
      duration: 4200,
      createdAt: "2025-01-12T16:45:00Z",
      wordCount: 6789,
      preview:
        "In today's episode, we're diving deep into the world of software development. Our guest is a renowned expert in cloud computing and microservices architecture...",
    },
  ];

  const filteredTranscripts = transcripts.filter((transcript) => {
    const matchesSearch =
      transcript.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transcript.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || transcript.type === filter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Transcripts</h1>
        <p className="text-lg text-gray-600">
          Browse and manage all your saved transcripts
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <TextField
              type="text"
              placeholder="Search transcripts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("audio")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "audio"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Audio
            </button>
            <button
              onClick={() => setFilter("youtube")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "youtube"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              YouTube
            </button>
          </div>
        </div>
      </div>

      {/* Transcripts Grid */}
      {filteredTranscripts.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTranscripts.map((transcript) => (
            <div
              key={transcript.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {transcript.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        transcript.type === "audio"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {transcript.type === "audio" ? "Audio" : "YouTube"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(transcript.duration)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{transcript.wordCount.toLocaleString()} words</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(transcript.createdAt)}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                {transcript.preview}
              </p>
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Link href={`/transcripts/${transcript.id}`} className="flex-1">
                  <Button
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Full
                  </Button>
                </Link>
                <Button variant="secondary" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No transcripts found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || filter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "You don't have any transcripts yet"}
          </p>
          {!searchQuery && filter === "all" && (
            <Link href="/summarize">
              <Button variant="primary">Create Your First Transcript</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
