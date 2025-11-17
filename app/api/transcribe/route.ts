import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import { getOpenAIClient } from "../../../lib/openai";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100MB

async function fetchYoutubeTitle(url: string) {
  try {
    const response = await fetch(
      `https://noembed.com/embed?url=${encodeURIComponent(url)}`
    );

    if (!response.ok) {
      return undefined;
    }

    const data = (await response.json()) as { title?: string };
    return data.title;
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const youtubeUrl = String(formData.get("youtubeUrl") || "").trim();

    if ((!file || !(file instanceof File) || file.size === 0) && !youtubeUrl) {
      return NextResponse.json(
        { error: "Please upload an audio file or provide a YouTube link." },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();

    if (file && file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          {
            error:
              "File is too large. Please upload an audio file smaller than 100MB.",
          },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], {
        type: file.type || "application/octet-stream",
      });
      const preparedFile = new File([blob], file.name || "audio-file", {
        type: file.type || "application/octet-stream",
      });

      const transcription = await openai.audio.transcriptions.create({
        file: preparedFile,
        model: "gpt-4o-mini-transcribe",
        temperature: 0.2,
        response_format: "verbose_json",
      });

      const segments = Array.isArray(transcription.segments)
        ? transcription.segments
        : [];

      const duration =
        transcription.duration ??
        (segments.length > 0 ? segments[segments.length - 1]?.end : null);

      return NextResponse.json({
        transcript: transcription.text,
        duration,
        title: file.name,
        sourceType: "audio",
      });
    }

    if (youtubeUrl) {
      let transcriptEntries;
      try {
        transcriptEntries = await YoutubeTranscript.fetchTranscript(
          youtubeUrl,
          { lang: "en" }
        );
      } catch (error) {
        return NextResponse.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Unable to fetch YouTube transcript. Make sure the video has captions enabled.",
          },
          { status: 400 }
        );
      }

      if (!transcriptEntries?.length) {
        return NextResponse.json(
          {
            error:
              "No transcript data was found for this video. Try another link.",
          },
          { status: 400 }
        );
      }

      const transcript = transcriptEntries
        .map((entry) => entry.text)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      const duration =
        transcriptEntries[transcriptEntries.length - 1]?.offset ?? null;

      const title = await fetchYoutubeTitle(youtubeUrl);

      return NextResponse.json({
        transcript,
        duration,
        title: title || "YouTube Video",
        sourceType: "youtube",
      });
    }

    return NextResponse.json(
      { error: "Unsupported input. Please try again." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Transcription error", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process transcription request.",
      },
      { status: 500 }
    );
  }
}
