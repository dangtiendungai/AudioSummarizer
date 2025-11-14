import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file. See .env.example for reference."
    );
  }

  // Validate URL format
  if (
    supabaseUrl === "your_supabase_project_url" ||
    supabaseAnonKey === "your_supabase_anon_key" ||
    (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://"))
  ) {
    throw new Error(
      "Invalid Supabase configuration. Please set valid NEXT_PUBLIC_SUPABASE_URL (must start with http:// or https://) and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
