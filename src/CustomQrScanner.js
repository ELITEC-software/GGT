import React, { useRef, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

const CustomQrScanner = (props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) {
        canvas.setAttribute('willReadFrequently', 'true');
      }
    }
  }, []);

  return (
    <div ref={containerRef}>
      <QrScanner {...props} />
    </div>
  );
};

export default CustomQrScanner;