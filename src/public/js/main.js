/* eslint-disable prettier/prettier */


async function registerServiceWorker() {
    await navigator.serviceWorker.register('../public/js/serviceWorker.js')
    updateUI();
  }
  
  function getRegistration() {
    return navigator.serviceWorker.getRegistration();
  }
  
  // Create and send a test notification to the service worker.
async function sendNotification() {
    // Use a random number as part of the notification data
    // (so you can tell the notifications apart during testing!)
    let randy = Math.floor(Math.random() * 100);
    let notification = {
      title: 'Test ' + randy,
      options: { body: 'Test body ' + randy }
    };
    // Get a reference to the service worker registration.
    let registration = await getRegistration();
    // Check that the service worker registration exists.
    if (registration) {
      // Check that a service worker controller exists before
      // trying to access the postMessage method.
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(notification);
      } else {
        console.log('No service worker controller found. Try a soft reload.');
      }
    }
  }
  