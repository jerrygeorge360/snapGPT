// height = (video.videoHeight / video.videoWidth) * width;

let snapShot=document.getElementById("circle");
let vid=document.getElementById("vid")
let canvas=document.getElementById("myCanvas");
let galleryIcon=document.getElementById("gallery-label");
let CameraReturn=document.getElementById("flipCamera");
let image_data_url=''
let footer=document.getElementById("footer")
//configuration for the camera.
const frontCameraConstraints = {
  video: {
    facingMode: 'user' // Front camera
  }
};

// Constraints for rear camera
const rearCameraConstraints = {
  video: {
    facingMode: 'environment' // Rear camera
  }
};

//check for camera availability.
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    if(navigator.onLine){
        startCam()

    }
    else {
        alert("You need an internet connection")

    }

}






function startCam(){
//    requesting access to front camera.

    navigator.mediaDevices.getUserMedia(rearCameraConstraints).then(
        function (stream){
            vid.srcObject=stream;

            vid.play();
            snapShot.addEventListener('click',(e)=>{
                let vidElement=document.getElementById("vid");
                canvas.style.display="block";
                canvas.width=vidElement.videoWidth;
                canvas.height=vidElement.videoHeight;
                console.log(canvas.width);
                console.log(canvas.height);


                canvas.getContext("2d").drawImage(vid,0,0,canvas.width,canvas.height);
                canvas.imageSmoothingEnabled=true;
                image_data_url=canvas.toDataURL("image/png")
                   let loader=  "<div class=\"loader\" id='loader'>\n" +
                    "            <div class=\"shine\"></div>\n" +
                    "            <div class=\"shine1\"></div>\n" +
                    "            <div class=\"shine2\"></div>\n" +
                    "            <div class=\"shine3\"></div>\n" +
                    "            <div class=\"shine4\"></div>\n" +
                    "        </div>"

                footer.insertAdjacentHTML("afterbegin",loader)
                snapShot.style.display="none";
                galleryIcon.style.display="none"
                CameraReturn.style.display="none";



                fetch("/camera", {method: "POST", body: image_data_url})
                    .then( r =>r.json())
                    .then((data)=>{
                           let arrayResponse=[];
                           let textArea=document.getElementById("intext");
                           let message=document.getElementById("message");
                           let myResponse=data['response'];
                           if(myResponse!=="invalid"){
                            arrayResponse.push(myResponse);
                           // document.getElementById("loader").classList.toggle("show-nothing");
                           let myLoader1=document.querySelectorAll("#loader");
                            for(let i=0;i<myLoader1.length;i++){
                            myLoader1[i].remove();
                            }
                           message.innerText=arrayResponse[0];
                            document.getElementById("modal").classList.toggle("show-nothing")
                            document.getElementById("close").classList.toggle("show-nothing")
                           }

                           if(myResponse==='invalid' || window.navigator.onLine===false ) {
                                let myLoader1=document.querySelectorAll("#loader");
                               console.log("invalid")
                                 for(let i=0;i<myLoader1.length;i++){
                                myLoader1[i].remove();
                            }





                                 document.getElementById("modal").classList.toggle("show-nothing")
                            document.getElementById("close").classList.toggle("show-nothing")
                                 message.innerText="Please position your camera properly and take a textual image."
                           }

                    })





            })
        }
    )
    .catch(function (error) {
    console.error("Error accessing rear camera:", error);
  });

}
document.getElementById("close").addEventListener("click",(e)=>{

    canvas.style.display="none";

    document.getElementById("modal").classList.toggle("show-nothing");
    snapShot.style.display="flex";
    e.target.classList.toggle("show-nothing");
    galleryIcon.classList.toggle("show-nothing");
     CameraReturn.style.display="flex";
     galleryIcon.style.display="inline-block"

    })

document.getElementById("toggle-modal").addEventListener(
    'click',()=>{
         document.getElementById("modal-inner").classList.toggle("modal-inner-minify");
        document.getElementById("modal").classList.toggle("modal-minify");



    }

)












// TODO:"stop the loader and any other functionality when there is no network."
//TODO:"add network connection check."
