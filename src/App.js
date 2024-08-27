import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import QRScanner from './QRScanner';
import Login from './Login';
import InstallPWA from './InstallPWA';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/qr-scanner-pwa" /> : <Login onLogin={handleLogin} />} />
          <Route path="/qr-scanner-pwa" element={isLoggedIn ? (
            <>
              <QRScanner />
              <InstallPWA />
            </>
          ) : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
