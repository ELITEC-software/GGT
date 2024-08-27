import React, { useState } from 'react';
import QRScanner from './QRScanner';
import InstallPWA from './InstallPWA';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cameraKey, setCameraKey] = useState(0);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const reloadApp = () => {
    setCameraKey(prevKey => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8D1737] to-[#6D1229] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="flex justify-center mb-4">
            <InstallPWA />
          </div>
          {!isLoggedIn ? (
            <Login onLogin={handleLogin} />
          ) : (
            <>
              <h1 className="text-center text-2xl font-semibold mb-5 text-[#8D1737]">QR Skener PWA</h1>
              <QRScanner key={cameraKey} />
              <div className="mt-4 text-center">
                <button
                  onClick={reloadApp}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Obnovit aplikaci
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
