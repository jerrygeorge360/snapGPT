let signupButton=document.getElementById('signup_submit');
signupButton.addEventListener('click',function (){
    let signupName=document.getElementById('name');
    let signupEmail=document.getElementById('email');
    let signupPassword=document.getElementById('password');
    let signupConPassword=document.getElementById('con_password');
    var formData= new FormData();
     if(signupPassword.value===signupConPassword.value) {
         formData.append('user_name', signupName.value);
         formData.append('email', signupEmail.value);
         formData.append('password', signupPassword.value);
         sendData(formData);
     }
    else{
        //TODO: write a code that properly shows this instead of an alert
        return alert('not matching')
    }


})
function sendData(data){
    fetch('/signup',{method:"POST",body:data})
        .then((r)=>{
            if(r.ok){
                   if(r.redirected){
                         window.location.href=r.url
                     }
            }
            if(r.status===401){
                //TODO:write the code for the pop-up
            }


        })
        .then((data)=>{
            console.log(data)
        })


}
