import OpenAI from "openai";

let cachedClient: OpenAI | null = null;

export function getOpenAIClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === "your_openai_api_key") {
    throw new Error(
      "Missing OpenAI configuration. Please set OPENAI_API_KEY in your environment."
    );
  }

  cachedClient = new OpenAI({
    apiKey,
  });

  return cachedClient;
}
