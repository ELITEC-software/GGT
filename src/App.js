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
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-5">QR Code Scanner PWA</h1>
          <InstallPWA />
          <QRScanner />
        </div>
      </div>
    </div>
  );
}

export default App;
