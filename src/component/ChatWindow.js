import React, { useState } from 'react';
import Message from './Message';


const ChatWindow = ({ currentChat, isTyping, handleSubmit, input, handleInputChange, startListening, isListening, messageEndRef }) => {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUploadClick = () => {
    if (!file) {
      alert('Primero selecciona un archivo');
      return;
    }
    console.log('Archivo seleccionado:', file);
    const formData = new FormData();
    formData.append('file', file);
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Éxito:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  
  return (
    <div className="flex-1 bg-indigo-400 rounded-lg shadow-md p-6">
      <div className="h-3/4 overflow-y-auto mb-4">
        {currentChat.messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isTyping && (
          <div className="text-left">
            <span className="inline-block p-2 rounded-lg bg-gray-200 text-black typing-animation">
              ChatGPT is typing...
            </span>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type your message..."
        />
        <button
          type="button"
          onClick={startListening}
          className={`p-2 ${isListening ? 'bg-red-500' : 'bg-indigo-700'} text-white`}
          disabled={isListening}
        >
          {isListening ? 'Listening...' : 'Voice Input'}
        </button>
        <button
        className="bg-indigo-500 text-white p-2 rounded-r-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={handleUploadClick}
        >
          <input type="file" onChange={handleFileChange} />
          Subir archivo
        </button>
        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 rounded-r-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
