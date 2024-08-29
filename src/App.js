import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import QRScanner from './QRScanner';
import Login from './Login';
import InstallPWA from './InstallPWA';
import { IonApp } from '@ionic/react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <IonApp>
      <Router basename="/">
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <Routes>
            <Route path="/" element={
              isLoggedIn ? (
                <Navigate to="/ggt-mobile" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } />
            <Route path="/ggt-mobile" element={
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
    </IonApp>
  );
}

export default App;
