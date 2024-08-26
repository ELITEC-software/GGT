import React from 'react';
import QRScanner from './QRScanner';
import InstallPWA from './InstallPWA';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>QR Code Scanner PWA</h1>
      <InstallPWA />
      <QRScanner />
    </div>
  );
}

export default App;