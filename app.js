if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(err => {
          console.error('Service Worker registration failed:', err);
        });
    });
  }
  
  if ('Notification' in window && 'serviceWorker' in navigator) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
  
        // Contoh mengirim push notification
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('Welcome to My PWA!', {
            body: 'Thank you for enabling notifications!',
            icon: '/images/icons/icon-192x192.jpg',
            badge: '/images/icons/icon-192x192.jpg'
          });
        });
      } else {
        console.log('Notification permission denied.');
      }
    });
  }
  