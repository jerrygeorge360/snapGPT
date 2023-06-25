let pdf_icon=document.getElementById("pdfIcon")

pdf_icon.addEventListener("click",()=>{
    alert("working")
    let text = document.getElementById("message").innerText


    fetch('/pdf', {
  method: 'GET',
})
  .then(response => {
    if (!response.ok) {
      throw new Error('File download failed');
    }
    return response.blob();
  })
  .then(blob => {
    // Create a download link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Set the download attribute and file name
    link.download = 'download.txt';

    // Simulate a click on the link to trigger the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);
  })
  .catch(error => {
    console.error('File download error:', error);
  });







})