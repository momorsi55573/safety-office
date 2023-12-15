/* eslint-disable prettier/prettier */
// Check if the browser supports service workers
const CheckPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('No Service Worker support!');
    }
    if (!('notifications' in window)) {
        throw new Error('No api support!');
    }
}

const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('../public/js/serviceWorker.js');
    return swRegistration;
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if (permission !== 'granted') {
        throw new Error('Permission not granted for Notification');
    }else{ new Notification('Hi there!');}
}

CheckPermission();
registerServiceWorker();
requestNotificationPermission();