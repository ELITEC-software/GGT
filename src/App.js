import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import QRScanner from './QRScanner';
import Login from './Login';
import InstallPWA from './InstallPWA';
import { IonApp } from '@ionic/react';
import { FaSignOutAlt, FaSync } from 'react-icons/fa';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <IonApp>
      <Router basename="/ggt-mobile">
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <Routes>
            <Route path="/" element={
              isLoggedIn ? <Navigate to="/scanner" /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/scanner" element={
              isLoggedIn ? (
                <>
                  <QRScanner />
                  <InstallPWA />
                  <div className="absolute top-4 left-4">
                    <button
                      onClick={handleRefresh}
                      className="bg-[#8D1737] text-white rounded-full p-3 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#6D1228] focus:outline-none focus:ring-2 focus:ring-[#8D1737] focus:ring-opacity-50"
                      aria-label="Obnovit stránku"
                    >
                      <FaSync className="text-xl text-white" />
                    </button>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={handleLogout}
                      className="bg-[#8D1737] text-white rounded-full p-3 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#6D1228] focus:outline-none focus:ring-2 focus:ring-[#8D1737] focus:ring-opacity-50"
                      aria-label="Odhlásit se"
                    >
                      <FaSignOutAlt className="text-xl text-white" />
                    </button>
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </IonApp>
  );
}

export default App;
