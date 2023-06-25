 document.getElementById("gallery-file").addEventListener("change",(e)=>{
          const file = e.target.files[0];
          const formData = new FormData();
          formData.set('file', file);
          console.log(formData.values())
          // let isEmpty=formData.entries().next().done
          let footer=document.getElementById("footer")
        let loader=  "<div class=\"loader\" id='loader'>\n" +
                    "            <div class=\"shine\"></div>\n" +
                    "            <div class=\"shine1\"></div>\n" +
                    "            <div class=\"shine2\"></div>\n" +
                    "            <div class=\"shine3\"></div>\n" +
                    "            <div class=\"shine4\"></div>\n" +
                    "        </div>"
                 if(file!==undefined){
                     let toggleItems=document.querySelectorAll(".toggle-item")
                        console.log(toggleItems)
                      for(let i=0;i<toggleItems.length;i++){
                          toggleItems[i].style.display="none";
                      }
                footer.insertAdjacentHTML("afterbegin",loader);
           fetch("/upload/image", {method: "POST", body: formData})
      .then(response=>response.json())
               .then(data=> {
                   let arrayResponse = [];
                   let img=URL.createObjectURL(file);
                   let myImage=document.getElementById("createImage")
                   myImage.src=img;
                   myImage.style.display="block";
                    document.getElementById("myCanvas").style.display="none";
                   document.getElementById("vid").style.display="none";

                   let myResponse = data['response'];

                   let myLoader=document.querySelectorAll("#loader");
                   for(let i=0;i<myLoader.length;i++){
                    myLoader[i].remove();
                    }
                   document.getElementById("modal").classList.toggle("show-nothing")
                   let x=document.getElementById("close")
                       x.classList.toggle("show-nothing")
                   x.addEventListener("click",()=>{
                       myImage.style.display="none";
                       document.getElementById("myCanvas").style.display="none";

                       document.getElementById("vid").style.display="inline";

                   })

                   for(let i=0;i<toggleItems.length;i++){
                       if(i===0){
                           toggleItems[i].style.display="inline-block"
                       }
                       else {
                        toggleItems[i].style.display="flex";
                       }

                    }


                   document.getElementById("message").innerText=myResponse


               })



.catch((error)=>{
    console.log(error)
})

     }
    })
//TODO:"add restrictions to the kind of data you can send."
 // TODO:"handle empty data request"
