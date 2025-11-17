# Audio Summarizer AI

A Next.js application that transcribes audio files and YouTube videos, then generates AI-powered summaries, notes, and action items. Built with Next.js 16, Supabase, and Tailwind CSS.

## Features

- 🎤 **Audio & YouTube Transcription**: Upload MP3/WAV files (up to 100 MB) or paste a YouTube link and get an instant transcript
- 📝 **AI Summarization**: Generates concise summaries, bullet-point highlights, and action items using OpenAI
- 💬 **RAG Chat**: Chat with your transcripts using Retrieval Augmented Generation
- 🔐 **Authentication**: Secure user authentication with Supabase
- 📊 **History & Transcripts**: Completed runs are saved automatically so you can revisit summaries, key points, and full transcripts whenever you like

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account (free tier works)

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your Supabase credentials and OpenAI key:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

   To get these values:

   1. Go to [Supabase Dashboard](https://app.supabase.com)
   2. Create a new project or select an existing one
   3. Go to **Settings** → **API**
   4. Copy the **Project URL** and **anon/public** key

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Project Structure

```
├── app/
│   ├── (app)/              # Protected routes (dashboard, summarize, etc.)
│   ├── components/         # Reusable UI components
│   ├── login/             # Authentication pages
│   ├── register/
│   └── forgot-password/
├── lib/
│   ├── openai.ts          # OpenAI client helper
│   └── supabase/          # Supabase client configuration
└── app/api/               # Transcribe & summarize endpoints
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Authentication**: Supabase Auth with row-level security
- **AI**: OpenAI (Whisper + GPT-4o-mini-transcribe + GPT-4.1 mini)
- **Icons**: Lucide React
- **Font**: Sarala (Google Fonts)

### Database schema (Supabase)

Create the `summaries` table to store transcripts and generated insights:

```sql
create table if not exists public.summaries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  title text,
  source_type text,
  duration numeric,
  transcript text,
  summary text,
  bullet_points jsonb,
  action_items jsonb,
  created_at timestamptz not null default now()
);

alter table public.summaries enable row level security;

create policy "Users can insert their summaries"
  on public.summaries for insert
  with check (auth.uid() = user_id);

create policy "Users can view their summaries"
  on public.summaries for select
  using (auth.uid() = user_id);
```

Run the SQL above from the Supabase SQL editor. Feel free to extend the schema with additional metadata or storage tables as your product grows.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
