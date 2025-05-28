"use client";

// This file handles the Gemini API integration
// API key will be loaded from environment variables or localStorage

let GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';

// Initialize the API key from environment variables or localStorage
if (typeof window !== 'undefined') {
  // Browser environment - try localStorage first
  const storedKey = localStorage.getItem('gemini_api_key');
  if (storedKey) {
    GEMINI_API_KEY = storedKey;
    console.log("Using API key from localStorage");
  }
} 

// For security reasons, we would typically use environment variables
// and server-side API calls, but for demonstration purposes:
export const setApiKey = (key: string) => {
  if (!key) return false;
  
  GEMINI_API_KEY = key;
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('gemini_api_key', key);
    console.log("API key saved to localStorage");
  }
  return true;
};

export const getApiKey = () => {
  // Try to get from environment variables first (for production)
  if (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.log("Using API key from environment variable");
    return process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  }
  
  // Try to get from localStorage as fallback (for development)
  if (typeof window !== 'undefined') {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      GEMINI_API_KEY = storedKey;
      console.log("Using API key from localStorage");
      return storedKey;
    }
  }
  
  return GEMINI_API_KEY;
};

// Simple validation of API key
export const validateApiKey = async (key: string): Promise<boolean> => {
  try {
    console.log("Validating API key...");
    // We'll do a simple test call to validate the API key
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
      method: 'GET',
      headers: {
        'x-goog-api-key': key
      }
    });
    
    if (response.ok) {
      console.log("API key validation successful");
      return true;
    } else {
      const errorText = await response.text();
      console.error("API key validation failed:", errorText);
      return false;
    }
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
};

interface GeminiResponse {
  text: string;
  error?: string;
}

export const sendMessageToGemini = async (message: string): Promise<GeminiResponse> => {
  try {
    console.log("Sending message to Gemini...");
    
    // First try to use the server-side API route
    try {
      console.log("Attempting to use server-side API route...");
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      
      console.log("Server API response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Server API response received");
        return { text: data.text };
      } else {
        const errorData = await response.json();
        console.error("Server API error:", errorData);
        
        // If server-side fails, we'll fall back to client-side
        console.log("Falling back to client-side API call...");
      }
    } catch (serverError) {
      console.error("Error using server-side API route:", serverError);
      console.log("Falling back to client-side API call...");
    }
    
    // Get the latest API key - environment variable takes precedence
    const apiKey = getApiKey();
    console.log("API key length:", apiKey?.length || 0);
    
    // Check if API key is set
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
      console.error("API key not configured");
      return {
        text: "API key hasn't been configured yet. Please ask the administrator to set up the Gemini API key.",
        error: "API key not configured"
      };
    }

    // Call the Gemini API with proper error handling
    try {
      console.log("Sending request to Gemini API...");
      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
      console.log("Request URL:", url);
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are Prasanthi Crafts AI Assistant. You help customers with questions about handcrafted arts and crafts products.
                
                Customer message: ${message}`
              }
            ]
          }
        ]
      };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify(requestBody)
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Raw error response:", errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
          console.error("Parsed error data:", JSON.stringify(errorData, null, 2));
        } catch (e) {
          console.error("Error parsing error response:", e);
          errorData = { error: { message: errorText || "Unknown error" } };
        }
        
        return {
          text: "Sorry, I'm having trouble connecting to my brain. Please try again later.",
          error: errorData.error?.message || errorText || "Unknown error"
        };
      }

      const data = await response.json();
      console.log("Response data received:", !!data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error("Unexpected API response format:", JSON.stringify(data, null, 2));
        return {
          text: "I received an unexpected response format. Please try again later.",
          error: "Unexpected response format"
        };
      }
      
      const responseText = data.candidates[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";
      console.log("Response text length:", responseText.length);

      return { text: responseText };
    } catch (fetchError) {
      console.error('Fetch error calling Gemini API:', fetchError);
      if (fetchError instanceof Error) {
        console.error('Error name:', fetchError.name);
        console.error('Error message:', fetchError.message);
        console.error('Error stack:', fetchError.stack);
      }
      
      return {
        text: "Sorry, there was a network error while connecting to the AI service. Please check your internet connection and try again.",
        error: fetchError instanceof Error ? fetchError.message : "Network error"
      };
    }
  } catch (error) {
    console.error('Error in sendMessageToGemini function:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return {
      text: "Sorry, something went wrong. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}; 