import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatApp from './components/ChatApp.jsx';
import Register from './pages/Register.jsx';
import LogIn from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import the ProtectedRoute component
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3000');

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Register  />} />
          <Route path="/login" element={<LogIn  socket={socket}/>} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatApp socket={socket} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
