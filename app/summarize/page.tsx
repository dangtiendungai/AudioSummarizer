"use client";

import { useState, useCallback } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Link from "next/link";

type ProcessingState = "idle" | "uploading" | "transcribing" | "summarizing" | "complete" | "error";

interface SummaryData {
  transcript: string;
  summary: string;
  bulletPoints: string[];
  actionItems: string[];
  duration?: number;
}

export default function SummarizePage() {
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [processingState, setProcessingState] = useState<ProcessingState>("idle");
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

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
      if (droppedFile.type.startsWith("audio/") || droppedFile.name.match(/\.(mp3|wav|m4a|ogg)$/i)) {
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
      setFile(e.target.files[0]);
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

  const handleSubmit = async () => {
    if (!file && !youtubeUrl.trim()) {
      setError("Please upload an audio file or enter a YouTube URL");
      return;
    }

    setError(null);
    setProcessingState("uploading");
    setSummaryData(null);

    try {
      // TODO: Replace with actual API calls
      // For now, simulate processing
      setProcessingState("transcribing");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setProcessingState("summarizing");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock data for UI preview
      setSummaryData({
        transcript: "This is a sample transcript. In a real implementation, this would contain the actual transcribed text from the audio file or YouTube video.",
        summary: "This is a sample summary of the audio content. It provides a concise overview of the main topics discussed.",
        bulletPoints: [
          "Key point one: Important information about the topic",
          "Key point two: Another significant detail mentioned",
          "Key point three: Additional insights from the discussion",
        ],
        actionItems: [
          "Follow up on the discussed proposal",
          "Schedule a meeting with the team",
          "Review the documents mentioned",
        ],
        duration: 120,
      });

      setProcessingState("complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setProcessingState("error");
    }
  };

  const handleReset = () => {
    setFile(null);
    setYoutubeUrl("");
    setSummaryData(null);
    setProcessingState("idle");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Audio Summarizer AI
          </h1>
          <p className="text-lg text-gray-600">
            Upload audio files or paste YouTube links to get AI-powered transcripts, summaries, and action items
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
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
                <svg
                  className="w-12 h-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-600 mb-2">
                  <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
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
              isLoading={processingState === "uploading" || processingState === "transcribing" || processingState === "summarizing"}
              className="flex-1"
            >
              {processingState === "idle" && "Process Audio"}
              {processingState === "uploading" && "Uploading..."}
              {processingState === "transcribing" && "Transcribing..."}
              {processingState === "summarizing" && "Generating Summary..."}
              {processingState === "complete" && "Process Complete"}
              {processingState === "error" && "Try Again"}
            </Button>
            {(file || youtubeUrl || summaryData) && (
              <Button
                onClick={handleReset}
                variant="secondary"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {summaryData && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{summaryData.summary}</p>
              {summaryData.duration && (
                <p className="text-sm text-gray-500 mt-3">
                  Duration: {Math.floor(summaryData.duration / 60)}:{(summaryData.duration % 60).toString().padStart(2, "0")}
                </p>
              )}
            </div>

            {/* Bullet Points Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Key Points
              </h2>
              <ul className="space-y-2">
                {summaryData.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-700 flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                Action Items
              </h2>
              <ul className="space-y-2">
                {summaryData.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transcript Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-gray-600"
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
                Full Transcript
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {summaryData.transcript}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Processing Indicator */}
        {processingState !== "idle" && processingState !== "complete" && processingState !== "error" && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">
              {processingState === "uploading" && "Uploading your audio file..."}
              {processingState === "transcribing" && "Transcribing audio to text..."}
              {processingState === "summarizing" && "Generating AI summary..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

