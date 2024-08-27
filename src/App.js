import React, { useEffect } from 'react';
import QRScanner from './QRScanner';
import InstallPWA from './InstallPWA';

function App() {
  useEffect(() => {
    console.log("Navigator:", navigator);
    console.log("Window:", window);
    if ('serviceWorker' in navigator) {
      console.log("Service Worker supported");
    } else {
      console.log("Service Worker not supported");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8D1737] to-[#6D1229] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-center text-2xl font-semibold mb-5 text-[#8D1737]">QR Code Scanner PWA</h1>
          <div className="flex justify-center">
            <InstallPWA />
          </div>
          <QRScanner />
        </div>
      </div>
    </div>
  );
}

export default App;
