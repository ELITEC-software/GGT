import React, { useEffect, useState } from 'react';

function InstallPWA() {
  const [installStatus, setInstallStatus] = useState('loading');
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const checkInstallation = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log("App is already installed (standalone mode)");
        setInstallStatus('installed');
      } else if (window.navigator.standalone === true) {
        console.log("App is already installed (iOS standalone)");
        setInstallStatus('installed');
      } else {
        console.log("App is not installed");
        setInstallStatus('not-installed');
      }
    };

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log("Can be installed");
      setDeferredPrompt(e);
      setInstallStatus('installable');
    };

    const handleAppInstalled = () => {
      console.log("App just installed");
      setInstallStatus('installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check installation status on mount and whenever the window gains focus
    checkInstallation();
    window.addEventListener('focus', checkInstallation);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('focus', checkInstallation);
    };
  }, []);

  console.log("Current install status:", installStatus);

  if (installStatus === 'loading') {
    return <p className="text-gray-600">Checking installation status...</p>;
  }

  if (installStatus === 'installed') {
    return <p className="text-green-600 font-semibold">App is installed</p>;
  }

  if (installStatus === 'not-installed') {
    return <p className="text-yellow-600">App can be installed from the browser menu</p>;
  }

  if (installStatus === 'installable') {
    return (
      <button
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                setInstallStatus('installed');
              } else {
                console.log('User dismissed the install prompt');
              }
              setDeferredPrompt(null);
            });
          }
        }}
      >
        Install App
      </button>
    );
  }

  return null;
}

export default InstallPWA;