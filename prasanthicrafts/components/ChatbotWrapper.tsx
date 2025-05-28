"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { setApiKey, validateApiKey, getApiKey } from './chatbot/geminiService';

// Import the Chatbot component dynamically with no SSR to avoid hydration issues
const Chatbot = dynamic(() => import('./chatbot'), { ssr: false });

export default function ChatbotWrapper() {
  const [mounted, setMounted] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState(false);

  useEffect(() => {
    async function initializeApiKey() {
      try {
        console.log("Initializing API key...");
        
        // Try to get the API key from environment variables first
        let geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        console.log("API key from env:", geminiApiKey ? "Found (length: " + geminiApiKey.length + ")" : "Not found");
        
        // If no environment variable, check if there's already a key in localStorage
        if (!geminiApiKey) {
          console.log("Checking localStorage for API key...");
          const existingKey = getApiKey();
          console.log("API key from localStorage:", existingKey ? "Found (length: " + existingKey.length + ")" : "Not found");
          
          if (existingKey && existingKey !== 'YOUR_GEMINI_API_KEY') {
            geminiApiKey = existingKey;
            console.log("Using API key from localStorage");
          } else {
            // Fallback to hardcoded key for development only
            // WARNING: This should be removed in production
            geminiApiKey = "AIzaSyD-yRgJrfY0rCigtQjBFU2LDIV1B8NzUHk";
            console.log("Using fallback API key");
          }
        }
        
        if (!geminiApiKey) {
          console.warn('No Gemini API key found in environment variables or localStorage');
          setValidationAttempted(true);
          setMounted(true);
          return;
        }
        
        // Set and validate the API key
        console.log("Setting API key...");
        const keySet = setApiKey(geminiApiKey);
        console.log("API key set result:", keySet);
        
        if (keySet) {
          // Validate the API key
          console.log("Validating API key...");
          try {
            const isValid = await validateApiKey(geminiApiKey);
            console.log(`API key validation result: ${isValid ? 'Valid' : 'Invalid'}`);
            
            if (!isValid) {
              console.error("API key validation failed. Please check your API key.");
            }
          } catch (validationError) {
            console.error("Error during API key validation:", validationError);
          }
        }
      } catch (error) {
        console.error('Error initializing API key:', error);
      } finally {
        setValidationAttempted(true);
      }
    }
    
    // Initialize API key and set mounted state
    initializeApiKey();
    setMounted(true);
  }, []);

  // Only render the Chatbot on the client-side and after validation attempt
  if (!mounted || !validationAttempted) return null;

  return <Chatbot />;
} 