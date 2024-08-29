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
    <Router basename="/ggt-mobile">
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <Routes>
          <Route path="/" element={
            isLoggedIn ? (
              <Navigate to="/scanner" />
            ) : (
              <>
                <Login onLogin={handleLogin} />
                <InstallPWA />
              </>
            )
          } />
          <Route path="/scanner" element={
            isLoggedIn ? (
              <>
                <QRScanner />
                <InstallPWA />
              </>
            ) : (
              <Navigate to="/" />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
