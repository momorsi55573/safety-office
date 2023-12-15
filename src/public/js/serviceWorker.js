/* eslint-disable prettier/prettier */
const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    // eslint-disable-next-line no-useless-escape
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outPutArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
        outPutArray[i] = rawData.charCodeAt(i);
        
    }
    return outPutArray;
    };
    const saveSubscription = async (subscription) => {
        const SERVER_URL = 'http://localhost:3000/save-subscription';
        const response = await fetch(SERVER_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription),
        });
        return response.json();
    };
self.addEventListener('activate', async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
        'BEiMjwCnIJ1Ns3Voriu2cpL1x4hr4mioj3Pb-pehWOxJmfj8bOrEccOp0zdWsepAqrU2y77Y_KgF4d6IwPTmSvs'
    )
  });
  const response = await saveSubscription(subscription);
  console.log(response)
});

//Public Key:
//BEiMjwCnIJ1Ns3Voriu2cpL1x4hr4mioj3Pb-pehWOxJmfj8bOrEccOp0zdWsepAqrU2y77Y_KgF4d6IwPTmSvs

//Private Key:
//iRPrLMnuZFWOgRE_vZ8Rhane-GY_F05X8gpm_Ru22mY