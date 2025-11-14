"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { FileText, Clock, Search, Calendar, Download, Eye } from "lucide-react";

interface HistoryItem {
  id: string;
  title: string;
  type: "audio" | "youtube";
  duration: number;
  createdAt: string;
  summary: string;
  status: "completed" | "processing" | "failed";
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "audio" | "youtube">("all");

  // Mock data - replace with actual API call
  const historyItems: HistoryItem[] = [
    {
      id: "1",
      title: "Team Meeting - Q4 Planning",
      type: "audio",
      duration: 3600,
      createdAt: "2025-01-15T10:30:00Z",
      summary: "Discussed Q4 goals, budget allocation, and team assignments...",
      status: "completed",
    },
    {
      id: "2",
      title: "YouTube Video: AI Trends 2025",
      type: "youtube",
      duration: 1800,
      createdAt: "2025-01-14T14:20:00Z",
      summary: "Overview of emerging AI technologies and their impact...",
      status: "completed",
    },
    {
      id: "3",
      title: "Client Call Recording",
      type: "audio",
      duration: 2400,
      createdAt: "2025-01-13T09:15:00Z",
      summary: "Product demo and feature discussion with potential client...",
      status: "completed",
    },
  ];

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">History</h1>
        <p className="text-lg text-gray-600">
          View and manage your previous summaries and transcripts
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <TextField
              type="text"
              placeholder="Search by title or content..."
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

      {/* History List */}
      {filteredItems.length > 0 ? (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.type === "audio"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {item.type === "audio" ? "Audio" : "YouTube"}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(item.duration)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link href={`/transcripts/${item.id}`}>
                    <Button
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No history found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || filter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "You haven't created any summaries yet"}
          </p>
          {!searchQuery && filter === "all" && (
            <Link href="/summarize">
              <Button variant="primary">Create Your First Summary</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
