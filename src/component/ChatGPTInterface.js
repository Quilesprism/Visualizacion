import React, { useState, useEffect, useRef } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import FileUploader from './FileUploader';

const ChatGPTInterface = () => {
  const [chats, setChats] = useState([{ id: 1, title: 'New Chat', messages: [] }]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [file, setFile] = useState(null);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const simulateResponse = (userInput) => {
    const responses = [
      "That's an interesting question. Let me think about it...",
      "Based on my knowledge, I would say...",
      "There are multiple perspectives on this topic. One approach could be...",
      "I'm not entirely sure, but here's what I understand about that...",
      "That's a complex issue. Let's break it down step by step...",
    ];
    return responses[Math.floor(Math.random() * responses.length)] + " " + userInput;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    addMessageToCurrentChat(userMessage);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = { role: 'assistant', content: simulateResponse(input) };
      addMessageToCurrentChat(aiResponse);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const addMessageToCurrentChat = (message) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  const startNewChat = () => {
    const newChatId = chats.length + 1;
    setChats(prevChats => [...prevChats, { id: newChatId, title: `New Chat ${newChatId}`, messages: [] }]);
    setCurrentChatId(newChatId);
  };

  const switchChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const startListening = () => {
    setIsListening(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="container mx-auto p-4 flex h-screen">
      <ChatList chats={chats} currentChatId={currentChatId} startNewChat={startNewChat} switchChat={switchChat} />
      <ChatWindow 
        currentChat={chats.find(chat => chat.id === currentChatId)}
        isTyping={isTyping}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        startListening={startListening}
        isListening={isListening}
        messageEndRef={messageEndRef}
      />
      
    </div>
  );
};

export default ChatGPTInterface;
