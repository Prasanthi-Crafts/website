"use client";

import { useState, useEffect } from 'react';
import { setApiKey, getApiKey, validateApiKey } from '@/components/chatbot/geminiService';

export default function ChatbotSettings() {
  const [apiKey, setApiKeyState] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    // Get the current API key when the component mounts
    const currentKey = getApiKey();
    setApiKeyState(currentKey);
    
    // If there's a current key, validate it
    if (currentKey && currentKey !== 'YOUR_GEMINI_API_KEY') {
      validateCurrentKey(currentKey);
    }
  }, []);
  
  const validateCurrentKey = async (key: string) => {
    setIsValidating(true);
    try {
      const valid = await validateApiKey(key);
      setIsValid(valid);
    } catch (err) {
      console.error('Error validating API key:', err);
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate API key (simple check for demonstration)
      if (!apiKey || apiKey.length < 10) {
        setError('Please enter a valid API key (at least 10 characters)');
        return;
      }
      
      setIsValidating(true);
      setError('');
      
      // Validate the API key with Gemini
      const isValidKey = await validateApiKey(apiKey);
      
      if (!isValidKey) {
        setError('The API key appears to be invalid. Please check and try again.');
        setIsValid(false);
        setIsValidating(false);
        return;
      }
      
      // Set the API key
      setApiKey(apiKey);
      setIsValid(true);
      
      // Show success message
      setSaved(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      setError('Failed to save API key');
      setIsValid(false);
      console.error('Error saving API key:', err);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Chatbot Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Gemini API Configuration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              Gemini API Key
            </label>
            <div className="relative">
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => {
                  setApiKeyState(e.target.value);
                  setIsValid(null); // Reset validation when key changes
                }}
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent ${
                  isValid === true ? 'border-green-500 focus:ring-green-400' :
                  isValid === false ? 'border-red-500 focus:ring-red-400' :
                  'border-gray-300 focus:ring-yellow-400'
                }`}
                placeholder="Enter your Gemini API key"
              />
              {isValid !== null && (
                <div className="absolute right-3 top-2.5">
                  {isValid ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              You can get an API key from the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>.
            </p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}
          
          {saved && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
              API key saved successfully!
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              className={`font-medium px-6 py-2 rounded transition-colors ${
                isValidating 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-yellow-400 text-black hover:bg-yellow-500'
              }`}
              disabled={isValidating}
            >
              {isValidating ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Validating...</span>
                </div>
              ) : 'Save Settings'}
            </button>
          </div>
        </form>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-2">Instructions</h3>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Get a Gemini API key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>.</li>
            <li>Enter your API key in the field above and click "Save Settings".</li>
            <li>The chatbot will now use your Gemini API key for all conversations.</li>
            <li>This key is stored in the browser and will be used for all future sessions.</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 