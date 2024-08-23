import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

function QRScanner() {
  const [result, setResult] = useState('No result');

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
        style={{ width: '100%' }}
      />
      <p>{result}</p>
    </div>
  );
}

export default QRScanner;