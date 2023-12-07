
    window.addEventListener("offline",()=>{
        // alert("Hello buddy seems you are offline");
        location.href="http://localhost:5000"
    })

    window.addEventListener("online",()=>{
        startCam()
    })

