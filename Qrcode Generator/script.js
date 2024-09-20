document.getElementById("generate-btn").addEventListener("click", function () {
    const userInput = document.getElementById("qr-input").value;
    const qrCodeContainer = document.getElementById("qr-code");
  
    if (userInput === "") {
      qrCodeContainer.innerHTML = "<p>Please enter some text or URL.</p>";
      return;
    }
  
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(userInput)}`;
  
    qrCodeContainer.innerHTML = `<img src="${apiUrl}" alt="QR Code">`;
  });
  