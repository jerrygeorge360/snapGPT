let form=document.getElementById("loginForm");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let email=document.getElementById("email")
    let password=document.getElementById("password");
    if(email.value===''|| password.value===''){
        alert("Fill in a filled")
    }
    else{
        let data=new FormData(form);
         const res= fetch("/login",{method:"POST",body:data})
             .then((r)=>{
                 if(r.ok){
                     if(r.redirected){

                         window.location.href=r.url
                         console.log(r.url)

                     }
                     return r.json()
                 }
                  else {
                    // Handle non-ok responses (e.g., show an error message)
                    throw new Error(`Failed to log in. Status: ${r.status}`);
                    }
             })
             .then((data)=>{
                 if(data.ok){
                     const dateString=data['Cookie-Expiration'];
                     const timeValue=Date.parse(dateString)
                     console.log(timeValue)
                     const dateObject=new Date(timeValue)
                     console.log(dateObject.toUTCString())

                    document.cookie=`access_token=${data['Access-Token']};expires=${dateObject.toUTCString()};path=/`
                     console.log(document.cookie)
                    window.location.href='http://localhost:3001/'
                 }
                 else if(data.error) {
                     console.log(data)
                     console.log('problem')
                 }

                 }

             )



    }
})
