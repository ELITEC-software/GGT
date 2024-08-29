import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import QRScanner from './QRScanner';
import Login from './Login';
import InstallPWA from './InstallPWA';
import { IonApp } from '@ionic/react';

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

  return (
    <IonApp>
      <Router basename="/">
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <Routes>
            <Route path="/" element={
              isLoggedIn ? <Navigate to="/ggt-mobile" /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/ggt-mobile" element={
              isLoggedIn ? (
                <>
                  <QRScanner />
                  <InstallPWA />
                  <button onClick={handleLogout} className="absolute top-4 right-4 mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    Odhlásit se
                  </button>
                </>
              ) : (
                <Navigate to="/ggt-mobile" />
              )
            } />
          </Routes>
        </div>
      </Router>
    </IonApp>
  );
}

export default App;
