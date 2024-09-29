import React from 'react';
import ChatGPTInterface from './component/ChatGPTInterface';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<div><ChatGPTInterface /></div>} />
      </Routes>
    </Router>
  );
}

export default App;

