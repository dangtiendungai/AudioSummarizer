# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be fully provisioned

## 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## 3. Set Up Environment Variables

1. Create a `.env.local` file in the root of your project
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with the values from step 2.

## 4. Configure Supabase Authentication

1. In your Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Add your site URL (e.g., `http://localhost:3000` for development)
3. Add redirect URLs:
   - `http://localhost:3000/reset-password` (for development)
   - Your production URL + `/reset-password` (for production)

## 5. Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** provider is enabled
3. Configure email templates if needed (optional)

## 6. Database Setup (Optional)

If you want to store user metadata:

1. Go to **Table Editor** in Supabase
2. The `auth.users` table is automatically created
3. You can add custom user metadata through the `user_metadata` field

## Testing

1. Start your development server: `npm run dev`
2. Try registering a new account at `/register`
3. Check your email for the confirmation link (if email confirmation is enabled)
4. Try logging in at `/login`

## Notes

- The app uses Supabase's built-in authentication
- User names are stored in `user_metadata.name` during registration
- Password reset emails are sent automatically by Supabase
- All authentication state is managed by Supabase

