import React from 'react';

const ChatList = ({ chats, currentChatId, startNewChat, switchChat }) => {
  return (
    <div className="w-1/4 bg-indigo-400 p-4 rounded-lg mr-4">
      <button
        onClick={startNewChat}
        className="w-full bg-indigo-500 text-white p-2 rounded-lg mb-4 hover:bg-indigo-600"
      >
        New Chat
      </button>
      {chats.map(chat => (
        <div
          key={chat.id}
          onClick={() => switchChat(chat.id)}
          className={`p-2 mb-2 rounded-lg cursor-pointer ${chat.id === currentChatId ? 'bg-indigo-200' : 'hover:bg-blue-300'}`}
        >
          {chat.title}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
