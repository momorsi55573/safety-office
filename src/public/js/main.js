/* eslint-disable prettier/prettier */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('../public/js/serviceWorker.js')
        .then((registration) => {
          console.log('Service worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service worker registration failed:', error);
        });
    });
  }
  