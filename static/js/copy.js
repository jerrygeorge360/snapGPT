let copyIcon=document.getElementById("copyIcon");

copyIcon.addEventListener("click",()=>{
    let textToCopy=document.getElementById("message");
        console.log(textToCopy.textContent)
        navigator.clipboard.writeText(textToCopy.textContent)?alert("copied"):"";

})