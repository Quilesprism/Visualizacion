import React from 'react';
import ChatGPTInterface from './component/ChatGPTInterface';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<div><ChatGPTInterface /></div>} />
      </Routes>
    </Router>
  );
}

export default App;

