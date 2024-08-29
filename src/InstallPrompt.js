import { useState, useEffect } from 'react';

export function useInstallPrompt() {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const ready = (e) => {
      e.preventDefault();
      setPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', ready);

    return () => {
      window.removeEventListener('beforeinstallprompt', ready);
    };
  }, []);

  const promptToInstall = () => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
    }
  };

  return [prompt, promptToInstall];
}