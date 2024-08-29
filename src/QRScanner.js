import React, { useState, useEffect } from 'react';
import CustomQrScanner from './CustomQrScanner';
import { FaQrcode } from 'react-icons/fa';

function QRScanner() {
  const [result, setResult] = useState('Nascanujte prosím QR kód');
  const [facingMode, setFacingMode] = useState('environment');
  const [key, setKey] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setFacingMode('environment');
    }
  }, []);

  const handleScan = (data) => {
    if (data) {
      setResult(data.text);
    }
  }

  const handleError = (err) => {
    console.error(err);
    setError('Chyba kamery. Zkuste prosím obnovit.');
  }

  const reloadCamera = () => {
    setKey(prevKey => prevKey + 1);
    setError(null);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mb-4">
      <h1 className="text-center text-2xl font-semibold text-[#8D1737] mb-4">QR Kód Skener</h1>
        {error ? (
          <div className="text-red-500 mb-2">{error}</div>
        ) : (
          <CustomQrScanner
            key={key}
            delay={100}
            onError={handleError}
            onScan={handleScan}
            className="w-full"
            constraints={{
              video: { facingMode: facingMode }
            }}
          />
        )}
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={reloadCamera}
          className="flex items-center justify-center bg-transparent text-black rounded-full p-3 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:text-white hover:bg-[#6D1228] focus:outline-none focus:ring-2 focus:ring-[#8D1737] focus:ring-opacity-50"
          aria-label="Obnovit kameru"
        >
          <FaQrcode className="text-4xl font-thin" style={{ strokeWidth: 1 }} />
        </button>
      </div>
      <p className="text-lg font-medium my-4">Zde se zobrazí výsledek:</p>
        <p className="text-2xl font-bold">{result}</p>
    </div>
  );
}

export default QRScanner;