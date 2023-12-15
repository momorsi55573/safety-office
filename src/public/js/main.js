/* eslint-disable prettier/prettier */
// Check if the browser supports service workers
if ('serviceWorker' in navigator) {
  // Register the service worker
  navigator.serviceWorker
    .register('../public/js/serviceWorker.js')
    .then((registration) => {
      console.log('Service worker registered:', registration);
    })
    .catch((error) => {
      console.error('Service worker registration failed:', error);
    });
} else {
  console.log('Service workers are not supported.');
}
