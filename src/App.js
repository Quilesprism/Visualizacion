import React from 'react';
import ChatGPTInterface from './component/ChatGPTInterface';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";

const isAuthenticated = () => {
  console.log(!!localStorage.getItem("token"))
  return !!localStorage.getItem("token");
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/home" 
          element={
            isAuthenticated() ? <ChatGPTInterface /> : <Navigate to="/" replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
