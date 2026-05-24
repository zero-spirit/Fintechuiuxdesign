# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for Ani.AMC.

## Prerequisites

- A Supabase account (free tier works fine)
- Node.js and pnpm installed

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - **Name**: Ani-AMC (or any name you prefer)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
   - **Pricing Plan**: Free tier is sufficient for development

## Step 2: Get Your API Keys

1. Once your project is created, go to **Project Settings** (gear icon in sidebar)
2. Click on **API** in the left menu
3. You'll see two important values:
   - **Project URL**: This is your `VITE_SUPABASE_URL`
   - **anon/public key**: This is your `VITE_SUPABASE_ANON_KEY`

## Step 3: Configure Environment Variables

1. In your project root, create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace the placeholders:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Enable Email Auth (Optional)

By default, Supabase requires email confirmation. For development, you may want to disable this:

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Click on **Email**
3. Scroll down to **Email Confirmation**
4. Disable "Enable email confirmations" for development
5. Click **Save**

## Step 5: Set up Google OAuth (Optional)

To enable Google sign-in:

1. Go to **Authentication** → **Providers**
2. Click on **Google**
3. Enable the provider
4. You'll need to create a Google OAuth app:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth client ID**
   - Application type: Web application
   - Add authorized redirect URIs:
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     ```
   - Copy the **Client ID** and **Client Secret**
5. Back in Supabase, paste your Google **Client ID** and **Client Secret**
6. Click **Save**

## Step 6: Test Authentication

1. Start your development server:
   ```bash
   pnpm dev:full
   ```

2. Navigate to `http://localhost:5173/signup`
3. Try creating an account
4. Check your Supabase dashboard under **Authentication** → **Users** to see the new user

## Troubleshooting

### "Invalid API key" error
- Double-check that you copied the entire anon key
- Make sure there are no extra spaces in your `.env.local` file
- Restart your dev server after changing environment variables

### Email not sending
- For development, disable email confirmation (see Step 4)
- For production, configure an SMTP server in Supabase settings

### Google Sign-In not working
- Make sure you've added the correct redirect URI in Google Cloud Console
- The redirect URI must match exactly (including https://)
- Enable the Google+ API in your Google Cloud project

## Security Notes

- **Never commit `.env.local`** to version control (it's already in `.gitignore`)
- The anon key is safe to use in client-side code (it's designed for that)
- Keep your service_role key secret (we don't use it in the frontend)
- For production, enable Row Level Security (RLS) policies in Supabase

## Next Steps

Once authentication is working:
- Customize email templates in Supabase dashboard
- Set up Row Level Security policies for your database
- Configure password requirements
- Add multi-factor authentication
- Set up social auth providers (GitHub, Facebook, etc.)

## Support

- [Supabase Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Discord](https://discord.supabase.com/)
