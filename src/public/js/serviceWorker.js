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
self.addEventListener('activate', async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
        'BEiMjwCnIJ1Ns3Voriu2cpL1x4hr4mioj3Pb-pehWOxJmfj8bOrEccOp0zdWsepAqrU2y77Y_KgF4d6IwPTmSvs'
    )
  });
  console.log(subscription)
});

//Public Key:
//BEiMjwCnIJ1Ns3Voriu2cpL1x4hr4mioj3Pb-pehWOxJmfj8bOrEccOp0zdWsepAqrU2y77Y_KgF4d6IwPTmSvs

//Private Key:
//iRPrLMnuZFWOgRE_vZ8Rhane-GY_F05X8gpm_Ru22mY