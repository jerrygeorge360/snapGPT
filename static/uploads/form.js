//real script.
let CameraRern=document.getElementById("flipCamera");
let snpShot=document.getElementById("circle");
let galeryIcon=document.getElementById("gallery-label");
let loader=  "<div class=\"loader\" id='loader'>\n" +
                    "            <div class=\"shine\"></div>\n" +
                    "            <div class=\"shine1\"></div>\n" +
                    "            <div class=\"shine2\"></div>\n" +
                    "            <div class=\"shine3\"></div>\n" +
                    "            <div class=\"shine4\"></div>\n" +
                    "        </div>"
let textbox=document.getElementById("message");
document.getElementById("gallery-box").addEventListener("click",(e)=>{
    document.getElementById("gallery-file").addEventListener("change",(e)=>{
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append('file', file);
           let footer=document.getElementById("footer")
        footer.insertAdjacentHTML("afterbegin",loader)
           fetch("/upload/image", {method: "POST", body: formData})
      .then(response=>response.json())
               .then(data=> {
                   let arrayResponse = [];
                   let img=URL.createObjectURL(file);
                   let myImage=document.getElementById("createImage")
                   myImage.src=img;
                   myImage.style.display="block";
                   document.getElementById("vid").style.display="none"

                   let myResponse = data['response'];
                   document.getElementById("loader").remove();
                   // document.getElementById("loader").remove();
                   snpShot.classList.display="none";
                   galeryIcon.style.display="none"
                   CameraReurn.style.display="none";
                   arrayResponse.push(myResponse);
                   textbox.innerText = arrayResponse[0]
                    document.getElementById("modal").classList.toggle("show-nothing")
                            document.getElementById("close").classList.toggle("show-nothing")


               })
       .then(error=>console.log(error))



    })

})
