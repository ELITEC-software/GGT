import React, { useState, useEffect } from 'react';
import CustomQrScanner from './CustomQrScanner';

function QRScanner() {
  const [result, setResult] = useState('Žádný výsledek');
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
      <div className="flex items-center justify-center mb-5">
        <h1 className="text-center text-2xl font-semibold text-[#8D1737] mr-2">QR Kód Skener</h1>
        <div className='pl-4'> 
        <button
          onClick={reloadCamera}
          className="bg-[#8D1737] hover:bg-[#6D1229] text-white rounded-full p-2 transition duration-300 ease-in-out transform hover:scale-110"
          aria-label="Obnovit kameru"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        </div>
      </div>
      <div className="w-full max-w-md mb-4">
        {error ? (
          <div className="text-red-500 mb-2">{error}</div>
        ) : (
          <CustomQrScanner
            key={key}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            className="w-full"
            constraints={{
              video: { facingMode: facingMode }
            }}
          />
        )}
      </div>
      <p className="text-lg font-medium mb-2">{result}</p>
    </div>
  );
}

export default QRScanner;