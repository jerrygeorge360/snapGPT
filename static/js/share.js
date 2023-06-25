// JavaScript
let share=document.getElementById("share")
share.addEventListener("click",()=>{
  let textToShare = document.getElementById("message").innerText;
  let shareLink = "whatsapp://send?text=" + encodeURIComponent(textToShare);
  window.open(shareLink);
})