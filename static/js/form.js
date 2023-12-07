 document.getElementById("gallery-file").addEventListener("change",(e)=>{
          const file = e.target.files[0];
          const formData = new FormData();
          formData.set('file', file);
          let footer=document.getElementById("footer");
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
                      function removeLoader(){
                             let myLoader=document.querySelectorAll("#loader");
                            for(let i=0;i<myLoader.length;i++){
                        myLoader[i].remove();
                    }

                      }
                footer.insertAdjacentHTML("afterbegin",loader);
           fetch("/upload/image", {method: "POST", body: formData,headers:{'access_token':localStorage.getItem('access_token')}})
      .then(response=>{
          if(response.ok){
              console.log('Connection successful');
              return response.json();
          }
          else {
              throw new Error(`failed status:${response.status}`)
          }

      })
               .then(data=> {
                   if(data.ok){
                       //creating the image to be displayed
                   let img=URL.createObjectURL(file);
                   let myImage=document.getElementById("createImage")
                   myImage.src=img;
                   //setting the image to be displayed to be visible.
                   myImage.style.display="block";
                   //hidding the canvas and the video feed.
                    document.getElementById("myCanvas").style.display="none";
                   document.getElementById("vid").style.display="none";
                    // collecting the data from the flask api.
                   let myResponse = data['response'];
                    //getting all the loaders to be removed.
                   //removing the loaders from the screen.
                   removeLoader();

                   //shows the modal for displaying the results.
                   document.getElementById("modal").classList.toggle("show-nothing")

                   //this closes the image being displayed and resets the necessary view.
                   let x=document.getElementById("close")
                       x.classList.toggle("show-nothing")
                   x.addEventListener("click",()=>{
                       myImage.style.display="none";
                       document.getElementById("myCanvas").style.display="none";

                       document.getElementById("vid").style.display="inline";

                   })

                   //this properly adjust the three icons
                   for(let i=0;i<toggleItems.length;i++){
                       if(i===0){
                           toggleItems[i].style.display="inline-block"
                       }
                       else {
                        toggleItems[i].style.display="flex";
                       }

                    }


                   document.getElementById("message").innerText=myResponse




                   }

                   else {
                       removeLoader();

                       //resetting the icons that was displaced by the loader.
                       // this properly adjust the three icons
                   for(let i=0;i<toggleItems.length;i++){
                       if(i===0){
                           toggleItems[i].style.display="inline-block"
                       }
                       else {
                        toggleItems[i].style.display="flex";
                       }

                    }
                   alert('please check your internet connection.')


                   }



               })
.catch((error)=>{
    console.log(error)
})



     }
    })
//TODO:"add restrictions to the kind of data you can send."
 // TODO:"handle empty data request"
