"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import {
  FileText,
  Search,
  Download,
  Eye,
  Calendar,
  Clock,
  Clipboard,
} from "lucide-react";
import { createClient } from "../../../lib/supabase/client";
import Link from "next/link";

interface TranscriptRow {
  id: string;
  title: string | null;
  source_type: "audio" | "youtube" | null;
  duration: number | null;
  created_at: string;
  transcript: string | null;
}

export default function TranscriptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "audio" | "youtube">("all");
  const [items, setItems] = useState<TranscriptRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeTranscript, setActiveTranscript] =
    useState<TranscriptRow | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTranscripts = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("summaries")
          .select("id,title,source_type,duration,created_at,transcript")
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
              : "Failed to load your transcripts."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTranscripts().catch(() => {
      /* handled */
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTranscripts = useMemo(() => {
    return items.filter((transcript) => {
      const title = (transcript.title || "Untitled Recording").toLowerCase();
      const preview = (transcript.transcript || "").toLowerCase();
      const matchesSearch =
        title.includes(searchQuery.toLowerCase()) ||
        preview.includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        transcript.source_type === filter ||
        (!transcript.source_type && filter === "audio");
      return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, filter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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

  const getWordCount = (text?: string | null) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  };

  const getPreview = (text?: string | null) => {
    if (!text) return "No transcript available.";
    return text.length > 320 ? `${text.slice(0, 320)}…` : text;
  };

  const handleDownload = (item: TranscriptRow) => {
    const blob = new Blob([item.transcript || "No transcript available."], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(item.title || "transcript").replace(/\s+/g, "-")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async (item: TranscriptRow) => {
    if (!item.transcript) return;
    try {
      await navigator.clipboard.writeText(item.transcript);
      setCopyMessage("Transcript copied to clipboard.");
      setTimeout(() => setCopyMessage(null), 2500);
    } catch {
      setCopyMessage("Unable to copy transcript.");
      setTimeout(() => setCopyMessage(null), 2500);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Transcripts</h1>
        <p className="text-lg text-gray-600">
          Browse and manage all your saved transcripts
        </p>
      </div>

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
        {copyMessage && (
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
            {copyMessage}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white p-6 shadow-lg border border-gray-200 animate-pulse"
            >
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-3" />
              <div className="h-3 w-full bg-gray-100 rounded mb-2" />
              <div className="h-3 w-2/3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : filteredTranscripts.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTranscripts.map((transcript) => {
            const words = getWordCount(transcript.transcript);
            return (
              <div
                key={transcript.id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {transcript.title || "Untitled Recording"}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          transcript.source_type === "youtube"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {transcript.source_type === "youtube"
                          ? "YouTube"
                          : "Audio"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(transcript.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>
                          {words.toLocaleString()}{" "}
                          {words === 1 ? "word" : "words"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(transcript.created_at)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                  {getPreview(transcript.transcript)}
                </p>
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Button
                    variant="primary"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={() => setActiveTranscript(transcript)}
                  >
                    <Eye className="w-4 h-4" />
                    View Full
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                    onClick={() => handleCopy(transcript)}
                  >
                    <Clipboard className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                    onClick={() => handleDownload(transcript)}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            );
          })}
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

      {activeTranscript && (
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {activeTranscript.title || "Transcript"}
              </h3>
              <p className="text-sm text-gray-500">
                Captured on {formatDate(activeTranscript.created_at)}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => setActiveTranscript(null)}
            >
              Close
            </Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {activeTranscript.transcript || "No transcript available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
