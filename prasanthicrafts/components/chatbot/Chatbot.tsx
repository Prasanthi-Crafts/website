"use client";

import { useState, useEffect } from 'react';
import ChatbotButton from './ChatbotButton';
import ChatbotWindow from './ChatbotWindow';
import { sendMessageToGemini } from './geminiService';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  // We can add any additional initialization logic here if needed

  return (
    <>
      <ChatbotButton onClick={toggleChat} isOpen={isOpen} />
      <ChatbotWindow isOpen={isOpen} onClose={closeChat} />
    </>
  );
};

export default Chatbot; 