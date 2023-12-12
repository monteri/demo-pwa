// self is a reference to the service worker itself
if (!self.define) {
// The 'install' event is fired when the service worker is installed
  self.addEventListener('install', event => {
    // Perform install steps if necessary
    console.log('Service Worker installing.');
  });

  // The 'activate' event is fired when the service worker starts
  self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
  });

  // The 'push' event listener listens for incoming push messages
  self.addEventListener('push', event => {
    console.log('Push event received.');

    let data = { title: 'New Notification', body: 'You have a new message!', icon: '/icon.png' };

    if (event.data) {
      data = event.data.json(); // Parse the received data
    }

    const options = {
      body: data.body,
      icon: data.icon,
      badge: '/badge-icon.png',
      vibrate: [100, 50, 100], // Vibration pattern for mobile devices
      data: {
        url: data.url || '/', // URL to open when the user clicks on the notification
      },
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options),
    );
  });

  // The 'notificationclick' event listener listens for clicks on the notifications
  self.addEventListener('notificationclick', event => {
    console.log('Notification click received.');

    event.notification.close(); // Close the notification

    // Handle the notification click
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      }),
    );
  });

  // The 'fetch' event listener can be used to intercept network requests and manage caching
  self.addEventListener('fetch', event => {
    // You can add caching strategies here
  });
}
