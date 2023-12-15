/* eslint-disable prettier/prettier */
 const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('No Service Worker support!');
        
    }
 }

 const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('../public/js/serviceWorker.js');
    return swRegistration;
 }

 checkPermission();
 registerServiceWorker()