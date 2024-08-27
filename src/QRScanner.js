import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

function QRScanner() {
  const [result, setResult] = useState('No result');
  const [facingMode, setFacingMode] = useState('environment');

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
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mb-4">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          className="w-full"
          constraints={{
            video: { facingMode: facingMode }
          }}
        />
      </div>
      <p className="text-lg font-medium">{result}</p>
    </div>
  );
}

export default QRScanner;