
    window.addEventListener("offline",()=>{
        // alert("Hello buddy seems you are offline");
        location.href="http://localhost:5000"
    })

    window.addEventListener("online",()=>{
        startCam()
    })

// function updateOnlineStatus(){
//   let content = document.getElementById("content");
//   let textContent = `Your network status is ${navigator.onLine ? "Online" : "Offline"} `;
//   content.textContent = textContent;
// }
// document.addEventListener("DOMContentLoaded", function () {
//   updateOnlineStatus();
//   window.addEventListener('online',  updateOnlineStatus);
//   window.addEventListener('offline', updateOnlineStatus);
// });


