import { NextResponse } from "next/server";
import { getOpenAIClient } from "../../../lib/openai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const transcript = String(body.transcript || "").trim();
    const title = body.title ? String(body.title) : "";
    const duration = body.duration ? Number(body.duration) : undefined;
    const sourceType = body.sourceType ? String(body.sourceType) : undefined;

    if (!transcript) {
      return NextResponse.json(
        { error: "Transcript is required for summarization." },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();

    const systemPrompt = `
You are an expert meeting and content summarizer. Analyze the provided transcript
and produce a concise executive summary, 3-6 bullet highlights, and clear action items.
Write in the second person plural (e.g., "You discussed", "Your team should").
Always respond with valid JSON using the structure:
{
  "summary": string,
  "bulletPoints": string[],
  "actionItems": string[]
}
If there are no explicit action items, infer reasonable follow-ups based on the content.
`;

    const contextDetails = [
      title && `Title: ${title}`,
      sourceType && `Source: ${sourceType}`,
      duration && `Duration (seconds): ${duration}`,
    ]
      .filter(Boolean)
      .join("\n");

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `${
            contextDetails ? `${contextDetails}\n\n` : ""
          }Transcript:\n${transcript}`,
        },
      ],
      temperature: 0.4,
    });

    const responseText = response.output_text;
    const rawText = Array.isArray(responseText)
      ? responseText.join("").trim()
      : responseText?.trim();

    if (!rawText) {
      throw new Error("Unable to parse summary response.");
    }

    let parsed: {
      summary: string;
      bulletPoints: string[];
      actionItems: string[];
    };

    try {
      parsed = JSON.parse(rawText);
    } catch {
      throw new Error("Model response was not valid JSON. Please try again.");
    }

    if (
      typeof parsed.summary !== "string" ||
      !Array.isArray(parsed.bulletPoints) ||
      !Array.isArray(parsed.actionItems)
    ) {
      throw new Error(
        "Model response did not match the required structure. Please try again."
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Summarization error", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate summary. Please try again.",
      },
      { status: 500 }
    );
  }
}
