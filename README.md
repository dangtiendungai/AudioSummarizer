# Audio Summarizer AI

A Next.js application that transcribes audio files and YouTube videos, then generates AI-powered summaries, notes, and action items. Built with Next.js 16, Supabase, and Tailwind CSS.

## Features

- 🎤 **Audio Transcription**: Upload MP3/WAV files or paste YouTube links
- 📝 **AI Summarization**: Generate short summaries, bullet-point notes, and action items
- 💬 **RAG Chat**: Chat with your transcripts using Retrieval Augmented Generation
- 🔐 **Authentication**: Secure user authentication with Supabase
- 📊 **Dashboard**: Track your summaries and transcripts

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
   
   Then edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
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
│   └── supabase/          # Supabase client configuration
└── middleware.ts          # Next.js middleware for session management
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Font**: Sarala (Google Fonts)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
