// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import AdminPanel from './AdminPanel';
import './index.css';
import Start from './Start';

function App() {
  return (
    <Router> {/* Wrap your routes with Router */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/start" element={<Start />}/>
        
      </Routes>
    </Router> // End Router here
  );
}

export default App;
