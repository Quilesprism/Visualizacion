import React, { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useAuth0 } from "@auth0/auth0-react";
import { removeToken, getAccessToken } from "../utils/tokenUtils";
import '../index.css'; 
const ChatGPTInterface = () => {
  const [chats, setChats] = useState([{ id: 1, title: "New Chat", messages: [] }]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messageEndRef = useRef(null);

  const { isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const handleLogout = () => {
    if (isAuthenticated) {
      console.log("Logging out with Auth0...");
      logout({ returnTo: window.location.origin });
    } else if (getAccessToken()) {
      console.log("Logging out from custom system...");
      removeToken();
      window.location.href = "/";
    } else {
      console.warn("No active session to log out from.");
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const simulateResponse = (userInput) => {
    const responses = [
      "That's an interesting question. Let me think about it...",
      "Based on my knowledge, I would say...",
      "There are multiple perspectives on this topic. One approach could be...",
      "I'm not entirely sure, but here's what I understand about that...",
      "That's a complex issue. Let's break it down step by step...",
    ];
    return `${responses[Math.floor(Math.random() * responses.length)]} ${userInput}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    addMessageToCurrentChat(userMessage);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = { role: "assistant", content: simulateResponse(input) };
      addMessageToCurrentChat(aiResponse);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const addMessageToCurrentChat = (message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId ? { ...chat, messages: [...chat.messages, message] } : chat
      )
    );
  };

  const startNewChat = () => {
    setChats([...chats, { id: chats.length + 1, title: `New Chat ${chats.length + 1}`, messages: [] }]);
    setCurrentChatId(chats.length + 1);
  };

  const switchChat = (chatId) => setCurrentChatId(chatId);

  const startListening = () => {
    setIsListening(true);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="container mx-auto p-6 flex h-screen bg-gray-100">
      <ChatList
        chats={chats}
        currentChatId={currentChatId}
        startNewChat={startNewChat}
        switchChat={switchChat}
        logout={handleLogout}
      />
      <ChatWindow
        currentChat={chats.find((chat) => chat.id === currentChatId)}
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
