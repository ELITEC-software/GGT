import React, { useEffect, useState } from 'react';

function InstallPWA() {
  const [installStatus, setInstallStatus] = useState('načítání');
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const checkInstallation = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log("Aplikace je již nainstalována (samostatný režim)");
        setInstallStatus('nainstalováno');
      } else if (window.navigator.standalone === true) {
        console.log("Aplikace je již nainstalována (iOS samostatný)");
        setInstallStatus('nainstalováno');
      } else {
        console.log("Aplikace není nainstalována");
        setInstallStatus('nenainstalováno');
      }
    };

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log("Lze nainstalovat");
      setDeferredPrompt(e);
      setInstallStatus('instalovatelné');
    };

    const handleAppInstalled = () => {
      console.log("Aplikace byla právě nainstalována");
      setInstallStatus('nainstalováno');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    checkInstallation();
    window.addEventListener('focus', checkInstallation);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('focus', checkInstallation);
    };
  }, []);

  console.log("Aktuální stav instalace:", installStatus);

  if (installStatus === 'načítání') {
    return <p className="text-gray-600">Kontrola stavu instalace...</p>;
  }

  if (installStatus === 'nainstalováno') {
    return <p className="text-green-600 font-semibold">Aplikace je nainstalována</p>;
  }

  if (installStatus === 'nenainstalováno') {
    return <p className="text-yellow-600">Aplikaci lze nainstalovat z menu prohlížeče</p>;
  }

  if (installStatus === 'instalovatelné') {
    return (
      <button
        className="mb-4 bg-[#8D1737] hover:bg-[#6D1229] text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('Uživatel přijal výzvu k instalaci');
                setInstallStatus('nainstalováno');
              } else {
                console.log('Uživatel odmítl výzvu k instalaci');
              }
              setDeferredPrompt(null);
            });
          }
        }}
      >
        Nainstalovat aplikaci
      </button>
    );
  }

  return null;
}

export default InstallPWA;