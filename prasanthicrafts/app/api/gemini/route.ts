import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get request body
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured on the server' },
        { status: 500 }
      );
    }
    
    // Call Gemini API
    try {
      console.log("Calling Gemini API from server-side...");
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
                  text: `You are Prasanthi Crafts AI Assistant. You help customers with questions about handcrafted arts and crafts products.
                  
                  Customer message: ${message}`
                }
              ]
            }
          ]
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error:", errorText);
        
        return NextResponse.json(
          { error: `API error: ${errorText}` },
          { status: response.status }
        );
      }
      
      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";
      
      return NextResponse.json({ text: responseText });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return NextResponse.json(
        { error: 'Error calling Gemini API' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
} 