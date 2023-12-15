/* eslint-disable prettier/prettier */
// Show notification when received
console.log('Service worker loaded.');
self.addEventListener('message', (event) => {
    let notification = event.data;
    self.registration.showNotification(
      notification.title,
      notification.options
    ).catch((error) => {
      console.log(error);
    });
  });
  