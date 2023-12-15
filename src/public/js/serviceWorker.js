/* eslint-disable prettier/prettier */
console.log('hello:', registration);
self.addEventListener('push', function (event) {
  const options = {
    body: event.data.text(),
    icon: '/path/to/icon.png',
    badge: '/path/to/badge.png',
    vibrate: [200, 100, 200],
    data: {
      url: event.data.url,
    },
  };

  event.waitUntil(
    self.registration.showNotification('Notification Title', options),
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(clients.openWindow(event.notification.data.url));
});
