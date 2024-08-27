import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

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
      <div className="w-full max-w-md mb-4">
        {error ? (
          <div className="text-red-500 mb-2">{error}</div>
        ) : (
          <QrScanner
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
      <button
        onClick={reloadCamera}
        className="bg-[#8D1737] hover:bg-[#6D1229] text-white font-bold py-2 px-4 rounded"
      >
        Obnovit kameru
      </button>
    </div>
  );
}

export default QRScanner;