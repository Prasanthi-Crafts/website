"use client";

import { useState, useEffect } from 'react';

export default function ApiTest() {
  const [apiKey, setApiKey] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get API key from localStorage or environment variable
    const storedKey = localStorage.getItem('gemini_api_key');
    const envKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (envKey) {
      setApiKey(envKey);
      console.log("Using API key from environment variable");
    } else if (storedKey) {
      setApiKey(storedKey);
      console.log("Using API key from localStorage");
    }
  }, []);

  const testApiEndpoint = async () => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);
    
    try {
      console.log("Testing Gemini API endpoint...");
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
        method: 'GET',
        headers: {
          'x-goog-api-key': apiKey
        }
      });
      
      console.log("Response status:", response.status);
      const text = await response.text();
      
      try {
        const data = JSON.parse(text);
        setTestResult(JSON.stringify(data, null, 2));
      } catch (e) {
        setTestResult(text);
      }
    } catch (error) {
      console.error("API test error:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };
  
  const testContent = async () => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);
    
    try {
      console.log("Testing Gemini content generation...");
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Hello, can you help me test if this API is working?"
                }
              ]
            }
          ]
        })
      });
      
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      
      const text = await response.text();
      console.log("Raw response:", text);
      
      try {
        const data = JSON.parse(text);
        setTestResult(JSON.stringify(data, null, 2));
      } catch (e) {
        setTestResult(text);
      }
    } catch (error) {
      console.error("API test error:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Gemini API Test</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          API Key
        </label>
        <div className="flex space-x-2">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2"
            placeholder="Enter your Gemini API key"
          />
          <button
            onClick={() => {
              localStorage.setItem('gemini_api_key', apiKey);
              alert("API key saved to localStorage");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={testApiEndpoint}
          disabled={isLoading || !apiKey}
          className="bg-blue-500 text-white px-6 py-3 rounded-md disabled:bg-gray-300"
        >
          Test API Endpoint
        </button>
        
        <button
          onClick={testContent}
          disabled={isLoading || !apiKey}
          className="bg-purple-500 text-white px-6 py-3 rounded-md disabled:bg-gray-300"
        >
          Test Content Generation
        </button>
      </div>
      
      {isLoading && (
        <div className="mb-4 text-blue-600">
          Testing API... Please wait.
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded-md">
          <h3 className="text-red-700 font-medium mb-2">Error:</h3>
          <pre className="whitespace-pre-wrap text-red-800">{error}</pre>
        </div>
      )}
      
      {testResult && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Result:</h3>
          <pre className="p-4 bg-gray-100 rounded-md overflow-auto max-h-96 whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-yellow-50 rounded-md">
        <h3 className="font-medium mb-2">Troubleshooting Tips:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Make sure your API key is valid and has access to the Gemini API</li>
          <li>Check for CORS issues in the browser console</li>
          <li>Verify that the API endpoint URLs are correct</li>
          <li>Ensure your API key has been properly activated in Google AI Studio</li>
          <li>Check if you need to enable billing for your Google Cloud project</li>
        </ul>
      </div>
    </div>
  );
} 