import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Gemini API route called');
    
    // Get request body
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      console.log('API Error: Message is required');
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Get API key from environment variable or fallback to the hardcoded key
    // Note: In production, you should only use environment variables
    const apiKey = process.env.GEMINI_API_KEY || 
                  process.env.NEXT_PUBLIC_GEMINI_API_KEY || 
                  "AIzaSyD-yRgJrfY0rCigtQjBFU2LDIV1B8NzUHk"; // Fallback to provided key
    
    console.log("API Key available:", !!apiKey, "Length:", apiKey?.length || 0);
    
    if (!apiKey) {
      console.log('API Error: No API key available');
      return NextResponse.json(
        { error: 'API key not configured on the server' },
        { status: 500 }
      );
    }
    
    // Call Gemini API
    try {
      console.log("Calling Gemini API from server-side...");
      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
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
      
      console.log("Request body:", JSON.stringify(requestBody));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify(requestBody)
      });
      
      console.log("Response status:", response.status);
      console.log("Response OK:", response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error:", errorText);
        
        let errorResponse = { error: `API error: ${errorText}` };
        console.log("Error response:", JSON.stringify(errorResponse));
        
        return NextResponse.json(
          errorResponse,
          { status: response.status }
        );
      }
      
      const data = await response.json();
      console.log("Data received:", !!data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error("Unexpected API response format:", JSON.stringify(data));
        return NextResponse.json(
          { 
            error: 'Unexpected API response format',
            details: JSON.stringify(data)
          },
          { status: 500 }
        );
      }
      
      const responseText = data.candidates[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";
      console.log("Response text length:", responseText.length);
      
      return NextResponse.json({ text: responseText });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return NextResponse.json(
        { 
          error: 'Error calling Gemini API',
          details: error instanceof Error ? error.message : String(error)
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { 
        error: 'Error processing request',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 