"use client";

import { useState, useCallback } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import {
  Upload,
  FileText,
  CheckSquare,
  MessageSquare,
  Info,
  Clock,
  Link2,
  Music,
} from "lucide-react";
import { createClient } from "../../../lib/supabase/client";

type ProcessingState =
  | "idle"
  | "uploading"
  | "transcribing"
  | "summarizing"
  | "complete"
  | "error";

interface TranscriptResult {
  transcript: string;
  sourceType: "audio" | "youtube";
  duration?: number | null;
  title?: string;
}

interface SummaryData {
  summary: string;
  bulletPoints: string[];
  actionItems: string[];
}

interface PersistedRecord extends SummaryData {
  transcript: string;
  sourceType: "audio" | "youtube";
  duration?: number | null;
  title?: string;
}

export default function SummarizePage() {
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [processingState, setProcessingState] =
    useState<ProcessingState>("idle");
  const [transcriptResult, setTranscriptResult] =
    useState<TranscriptResult | null>(null);
  const [summaryResult, setSummaryResult] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type.startsWith("audio/") ||
        droppedFile.name.match(/\.(mp3|wav|m4a|ogg)$/i)
      ) {
        setFile(droppedFile);
        setYoutubeUrl("");
        setError(null);
      } else {
        setError("Please upload a valid audio file (MP3, WAV, M4A, OGG)");
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxBytes = 100 * 1024 * 1024;
      if (selectedFile.size > maxBytes) {
        setError("Please select a file smaller than 100MB.");
        return;
      }
      setFile(selectedFile);
      setYoutubeUrl("");
      setError(null);
    }
  };

  const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
    if (e.target.value) {
      setFile(null);
      setError(null);
    }
  };

  const persistSummary = useCallback(async (record: PersistedRecord) => {
    setSaveStatus("saving");
    setSaveMessage("Saving to history...");
    try {
      let supabase;
      try {
        supabase = createClient();
      } catch (clientError) {
        setSaveStatus("error");
        setSaveMessage(
          clientError instanceof Error
            ? clientError.message
            : "Supabase is not configured. Skipping save."
        );
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "You must be logged in to save summaries. Please sign in again."
        );
      }

      const { error: insertError } = await supabase.from("summaries").insert({
        user_id: user.id,
        title:
          record.title ||
          (record.sourceType === "audio"
            ? "Audio Recording"
            : "YouTube Recording"),
        source_type: record.sourceType,
        duration: record.duration ?? null,
        transcript: record.transcript,
        summary: record.summary,
        bullet_points: record.bulletPoints,
        action_items: record.actionItems,
      });

      if (insertError) {
        throw insertError;
      }

      setSaveStatus("success");
      setSaveMessage("Saved to history.");
    } catch (err) {
      setSaveStatus("error");
      setSaveMessage(
        err instanceof Error
          ? err.message
          : "Failed to save summary to history."
      );
    }
  }, []);

  const handleSubmit = async () => {
    if (!file && !youtubeUrl.trim()) {
      setError("Please upload an audio file or enter a YouTube URL");
      return;
    }

    setError(null);
    setSummaryResult(null);
    setTranscriptResult(null);
    setSaveStatus("idle");
    setSaveMessage(null);

    setProcessingState(file ? "uploading" : "transcribing");

    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      if (youtubeUrl.trim()) {
        formData.append("youtubeUrl", youtubeUrl.trim());
      }

      const transcriptionResponse = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!transcriptionResponse.ok) {
        const payload = await transcriptionResponse.json().catch(() => ({}));
        throw new Error(
          payload.error || "Failed to transcribe the provided content."
        );
      }

      const transcriptPayload =
        (await transcriptionResponse.json()) as TranscriptResult;
      setTranscriptResult(transcriptPayload);

      setProcessingState("summarizing");

      const summaryResponse = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: transcriptPayload.transcript,
          duration: transcriptPayload.duration,
          title: transcriptPayload.title,
          sourceType: transcriptPayload.sourceType,
        }),
      });

      if (!summaryResponse.ok) {
        const payload = await summaryResponse.json().catch(() => ({}));
        throw new Error(
          payload.error || "Failed to generate summary. Please try again."
        );
      }

      const summaryPayload = (await summaryResponse.json()) as SummaryData;
      setSummaryResult(summaryPayload);
      setProcessingState("complete");

      await persistSummary({
        ...summaryPayload,
        transcript: transcriptPayload.transcript,
        sourceType: transcriptPayload.sourceType,
        duration: transcriptPayload.duration,
        title:
          transcriptPayload.title ||
          (file?.name ??
            (transcriptPayload.sourceType === "youtube"
              ? "YouTube Recording"
              : "Audio Recording")),
      });
    } catch (err) {
      setProcessingState("error");
      setSummaryResult(null);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const handleReset = () => {
    setFile(null);
    setYoutubeUrl("");
    setSummaryResult(null);
    setTranscriptResult(null);
    setProcessingState("idle");
    setError(null);
    setSaveStatus("idle");
    setSaveMessage(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Audio Summarizer
        </h1>
        <p className="text-lg text-gray-600">
          Upload audio files or paste YouTube links to get AI-powered
          transcripts, summaries, and action items
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
        {/* File Upload Area */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Audio File
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="audio/*,.mp3,.wav,.m4a,.ogg"
              onChange={handleFileChange}
              className="hidden"
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">
                <span className="text-blue-600 font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                MP3, WAV, M4A, OGG (max 100MB)
              </p>
            </label>
            {file && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Selected:</span> {file.name}
                  <span className="text-gray-500 ml-2">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* YouTube URL Input */}
        <div className="mb-6">
          <TextField
            type="url"
            label="YouTube URL"
            value={youtubeUrl}
            onChange={handleYoutubeUrlChange}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={processingState !== "idle" && processingState !== "error"}
            isLoading={
              processingState === "uploading" ||
              processingState === "transcribing" ||
              processingState === "summarizing"
            }
            className="flex-1"
          >
            {processingState === "idle" && "Process Audio"}
            {processingState === "uploading" && "Uploading..."}
            {processingState === "transcribing" && "Transcribing..."}
            {processingState === "summarizing" && "Generating Summary..."}
            {processingState === "complete" && "Process Complete"}
            {processingState === "error" && "Try Again"}
          </Button>
          {(file || youtubeUrl || summaryResult || transcriptResult) && (
            <Button onClick={handleReset} variant="secondary">
              Reset
            </Button>
          )}
        </div>

        {saveMessage && (
          <div
            className={`mt-4 rounded-lg border p-3 text-sm ${
              saveStatus === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : saveStatus === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-blue-200 bg-blue-50 text-blue-700"
            }`}
          >
            {saveMessage}
          </div>
        )}
      </div>

      {/* Recording Details */}
      {transcriptResult && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-600" />
              Recording Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Music className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="font-medium text-gray-900">
                    {transcriptResult.title || "Untitled Recording"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Link2 className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Source</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {transcriptResult.sourceType}
                  </p>
                </div>
              </div>
              {typeof transcriptResult.duration === "number" && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium text-gray-900">
                      {Math.floor(transcriptResult.duration / 60)}:
                      {(transcriptResult.duration % 60)
                        .toString()
                        .padStart(2, "0")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {summaryResult && (
            <>
              {/* Summary Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {summaryResult.summary}
                </p>
              </div>

              {/* Bullet Points Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-purple-600" />
                  Key Points
                </h2>
                <ul className="space-y-2">
                  {summaryResult.bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1">•</span>
                      <span className="text-gray-700 flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-green-600" />
                  Action Items
                </h2>
                <ul className="space-y-2">
                  {summaryResult.actionItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700 flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Transcript Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-gray-600" />
              Full Transcript
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {transcriptResult.transcript}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Processing Indicator */}
      {processingState !== "idle" &&
        processingState !== "complete" &&
        processingState !== "error" && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">
              {processingState === "uploading" &&
                "Uploading and transcribing your audio..."}
              {processingState === "transcribing" &&
                "Fetching transcript for the provided link..."}
              {processingState === "summarizing" && "Generating AI summary..."}
            </p>
          </div>
        )}

      {processingState === "error" && !error && (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-red-200">
          <p className="text-red-600">
            Something went wrong while processing your request.
          </p>
        </div>
      )}
    </div>
  );
}
