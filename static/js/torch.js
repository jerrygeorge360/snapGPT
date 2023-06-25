// // Check if the browser supports the DeviceLight API
// function setFlashlightStatus(status) {
//         track.applyConstraints({
//             advanced: [{
//                 torch: status
//             }]
//         });
// if ('light' in navigator) {
//   const light = navigator.light
//   torch=document.getElementById("flipCamera");
//   torch.addEventListener('click',turner)
//     let num=false
//     function turner(){
//         num=!num
//         if (num){
//
//               light.turnOn()
//                 .then(() => {
//                   console.log('Torchlight turned on');
//                 })
//                 .catch(error => {
//                   console.error('Failed to turn on torchlight:', error);
//                 });
//         }
//         else {
//             light.turnOff()
//                 .then(() => {
//                   console.log('Torchlight turned off');
//                 })
//                 .catch(error => {
//                   console.error('Failed to turn off torchlight:', error);
//                 });
//         }
//     }
//
//
//   // Turn off the torchlight
//
//
// } else {
//   console.log('Device does not support torchlight API');
// }




class flashlightHandler {

    static track; //the video track which is used to turn on/off the flashlight

    static accessFlashlight() {
        //Test browser support
        if (!('mediaDevices' in window.navigator)) {
            alert("Media Devices not available. Use HTTPS!");
            return;
        };

        //Get the environment camera (usually the second one)
        window.navigator.mediaDevices.enumerateDevices().then((devices) => {

            const cameras = devices.filter((device) => device.kind === 'videoinput');
            if (cameras.length === 0) {
                alert("No camera found. If your device has camera available, check permissions.");
                return;
            };

            const camera = cameras[cameras.length - 1];

            window.navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: camera.deviceId
                }
            }).then((stream) => {
                this.track = stream.getVideoTracks()[0];

                if (!(this.track.getCapabilities().torch)) {
                    alert("No torch available.");
                };
            });
        });
    }

    static setFlashlightStatus(status) {
        this.track.applyConstraints({
            advanced: [{
                torch: status
            }]
        });
    }
}
flashlightHandler.accessFlashlight()
flashlightHandler.setFlashlightStatus(true)
