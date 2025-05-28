"use client";

import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini, getApiKey } from './geminiService';
import Link from 'next/link';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Check API key and set initial message
  useEffect(() => {
    try {
      const apiKey = getApiKey();
      const keyIsSet = Boolean(apiKey && apiKey !== 'YOUR_GEMINI_API_KEY');
      setIsApiKeySet(keyIsSet);

      // Set initial message based on API key status
      if (keyIsSet) {
        setMessages([
          {
            text: "Hello! I'm Prasanthi Crafts AI Assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date(),
          }
        ]);
      } else {
        setMessages([
          {
            text: "Hello! I'm Prasanthi Crafts AI Assistant. I notice that my API key hasn't been set up yet. Please ask the administrator to configure the Gemini API key in the admin settings.",
            sender: 'bot',
            timestamp: new Date(),
          }
        ]);
      }
    } catch (error) {
      console.error('Error initializing chatbot:', error);
      setHasApiError(true);
      setMessages([
        {
          text: "Hello! I'm having trouble initializing. Please try refreshing the page.",
          sender: 'bot',
          timestamp: new Date(),
        }
      ]);
    }
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await sendMessageToGemini(inputValue);
      
      if (response.error) {
        console.error('Error from Gemini API:', response.error);
        setHasApiError(true);
      }
      
      const botReply: Message = {
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botReply]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      setHasApiError(true);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: 'Sorry, I encountered an error. Please try again later.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={chatWindowRef}
      className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden border-2 border-yellow-400"
    >
      {/* Header */}
      <div className="bg-yellow-400 p-4 flex justify-between items-center">
        <h2 className="text-black font-bold">Prasanthi Crafts AI Assistant</h2>
        <button 
          onClick={onClose}
          className="text-black hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.sender === 'user'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-black text-white'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-black/70' : 'text-white/70'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-300 rounded-lg px-4 py-2 flex items-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        {!isApiKeySet && !hasApiError && (
          <div className="mt-4 p-3 bg-yellow-100 rounded-md border border-yellow-400 text-sm">
            <p className="font-medium mb-1">Admin Setup Required</p>
            <p className="mb-2">The Gemini API key needs to be configured for the chatbot to function properly.</p>
            <Link href="/admin/chatbot-settings" className="text-blue-600 hover:underline">
              Go to Chatbot Settings
            </Link>
          </div>
        )}
        {hasApiError && (
          <div className="mt-4 p-3 bg-red-100 rounded-md border border-red-400 text-sm">
            <p className="font-medium mb-1">API Error</p>
            <p>There was an error connecting to the Gemini API. Please check your API key or try again later.</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            disabled={isLoading || !isApiKeySet || hasApiError}
          />
          <button
            type="submit"
            className={`rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
              isApiKeySet && !hasApiError
                ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={isLoading || !isApiKeySet || hasApiError}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotWindow;