# Setting Up API Keys for Prasanthi Crafts

This document explains how to set up API keys for the Prasanthi Crafts website, particularly for the AI Chatbot feature.

## Gemini API Key Setup

The chatbot feature uses Google's Gemini API. To set up the API key:

1. Get a Gemini API key from [Google AI Studio](https://ai.google.dev/)
2. There are two ways to set up the API key:

### For Development:

Create a `.env.local` file in the root of your project with the following content:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

Replace `your_gemini_api_key_here` with your actual Gemini API key.

### For Production:

When deploying to a hosting platform like Vercel, Netlify, or similar:

1. Go to your hosting platform's dashboard
2. Find the environment variables or secrets section
3. Add a new environment variable:
   - Name: `NEXT_PUBLIC_GEMINI_API_KEY`
   - Value: Your Gemini API key

## Security Considerations

- **NEVER** commit your actual API keys to version control
- The `.env.local` file is automatically ignored by Git in Next.js projects
- If using a different setup, ensure your `.env.local` file is in your `.gitignore`
- Even though we're using a `NEXT_PUBLIC_` prefix (which makes the variable available in the browser), this is a compromise for this specific use case where client-side access is needed
- For more sensitive APIs, prefer using server-side API routes that don't expose your keys to the client

## Admin Interface

You can also set or update the API key through the admin interface at `/admin/chatbot-settings`. This stores the key in the browser's localStorage as a fallback method.

The preference order for API keys is:
1. Environment variable (NEXT_PUBLIC_GEMINI_API_KEY)
2. localStorage (set via admin interface) 