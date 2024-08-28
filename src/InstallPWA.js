import React, { useEffect, useState } from 'react';

function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const checkPlatform = () => {
      const ua = window.navigator.userAgent;
      setIsIOS(/iPad|iPhone|iPod/.test(ua) && !window.MSStream);
    };

    const checkInstallation = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        setIsInstalled(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => setIsInstalled(true));

    checkPlatform();
    checkInstallation();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setInstallPrompt(null);
    }
  };

  if (isInstalled) {
    return <p className="text-green-600 font-semibold text-center">Aplikace je nainstalována</p>;
  }

  return (
    <div className="text-center mt-4">
      {installPrompt && (
        <button
          className="mb-4 bg-[#8D1737] hover:bg-[#6D1229] text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleInstallClick}
        >
          Nainstalovat aplikaci
        </button>
      )}
      {isIOS ? (
        <div>
          <p className="text-yellow-600 mb-2">Pro instalaci na iOS:</p>
          <ol className="list-decimal list-inside text-left">
            <li>Klepněte na ikonu sdílení v Safari</li>
            <li>Vyberte 'Přidat na plochu'</li>
            <li>Potvrďte přidání aplikace</li>
          </ol>
        </div>
      ) : (
        <p className="text-yellow-600">
          {installPrompt
            ? "Klikněte na tlačítko výše pro instalaci aplikace."
            : "Aplikaci lze nainstalovat z menu prohlížeče. Hledejte možnost 'Přidat na plochu' nebo 'Nainstalovat aplikaci'."}
        </p>
      )}
    </div>
  );
}

export default InstallPWA;