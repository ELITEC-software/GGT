import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

function QRScanner() {
  const [result, setResult] = useState('No result');
  const [facingMode, setFacingMode] = useState('environment');

  useEffect(() => {
    // Check if it's a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setFacingMode('environment'); // Use the back camera on mobile devices
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
    <div>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%', maxWidth: '400px' }}
        constraints={{
          video: { facingMode: facingMode }
        }}
      />
      <p>{result}</p>
    </div>
  );
}

export default QRScanner;