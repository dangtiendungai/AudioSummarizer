"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import {
  FileText,
  Clock,
  Search,
  Calendar,
  Download,
  Eye,
  ListChecks,
} from "lucide-react";
import { createClient } from "../../../lib/supabase/client";
import Link from "next/link";

interface SummaryRow {
  id: string;
  title: string | null;
  source_type: "audio" | "youtube" | null;
  duration: number | null;
  created_at: string;
  summary: string | null;
  bullet_points: string[] | null;
  action_items: string[] | null;
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "audio" | "youtube">("all");
  const [items, setItems] = useState<SummaryRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<SummaryRow | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("summaries")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (isMounted) {
          setItems(data ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(
            err instanceof Error
              ? err.message
              : "Failed to load your history. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchHistory().catch(() => {
      /* already handled */
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const title = (item.title || "Untitled Recording").toLowerCase();
      const summary = (item.summary || "").toLowerCase();
      const matchesSearch =
        title.includes(searchQuery.toLowerCase()) ||
        summary.includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === "all" || item.source_type === filter || (!item.source_type && filter === "audio");
      return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, filter]);

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

  const formatDuration = (seconds?: number | null) => {
    if (!seconds || seconds <= 0) {
      return "—";
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleDownload = (item: SummaryRow) => {
    const blob = new Blob(
      [
        `Title: ${item.title || "Untitled Recording"}\n`,
        `Summary:\n${item.summary || "N/A"}\n\n`,
        `Action Items:\n${
          item.action_items?.map((action) => `- ${action}`).join("\n") || "N/A"
        }\n`,
      ],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(item.title || "summary").replace(/\s+/g, "-")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">History</h1>
        <p className="text-lg text-gray-600">
          View and manage your previous summaries and transcripts
        </p>
      </div>

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
            <Button
              onClick={() => setFilter("all")}
              variant={filter === "all" ? "primary" : "secondary"}
            >
              All
            </Button>
            <Button
              onClick={() => setFilter("audio")}
              variant={filter === "audio" ? "primary" : "secondary"}
            >
              Audio
            </Button>
            <Button
              onClick={() => setFilter("youtube")}
              variant={filter === "youtube" ? "primary" : "secondary"}
            >
              YouTube
            </Button>
          </div>
        </div>
        {fetchError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {fetchError}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl bg-white p-6 shadow-lg border border-gray-200"
            >
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-4" />
              <div className="h-3 w-full bg-gray-100 rounded mb-2" />
              <div className="h-3 w-2/3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.title || "Untitled Recording"}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.source_type === "youtube"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.source_type === "youtube" ? "YouTube" : "Audio"}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                      Completed
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.summary || "No summary available"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(item.duration)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(item.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                    onClick={() => setSelectedRecord(item)}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                    onClick={() => handleDownload(item)}
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

      {selectedRecord && (
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedRecord.title || "Selected Summary"}
              </h3>
              <p className="text-sm text-gray-500">
                Saved on {formatDate(selectedRecord.created_at)}
              </p>
            </div>
            <Button variant="secondary" onClick={() => setSelectedRecord(null)}>
              Close
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Summary
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {selectedRecord.summary || "No summary available."}
              </p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2">
                <ListChecks className="w-5 h-5 text-green-600" />
                Action Items
              </h4>
              {selectedRecord.action_items?.length ? (
                <ul className="space-y-2 text-gray-700">
                  {selectedRecord.action_items.map((action, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-600">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No action items recorded.</p>
              )}
            </div>
          </div>
          {selectedRecord.bullet_points?.length ? (
            <div className="mt-6">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <ListChecks className="w-5 h-5 text-purple-600" />
                Key Points
              </h4>
              <ul className="space-y-2 text-gray-700">
                {selectedRecord.bullet_points.map((point, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-purple-600">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
