document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("https://restapi.tu.ac.th/api/v2/profile/std/info/?id=6609611824", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Application-Key": "TUd557d5627d777be13cccefa5a9cf99fd78b8f5b5acbb1117b7e37a6040c274022c050cfdc266eec0acd8d44c2aad3731"
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
      // นำข้อมูลที่ได้จาก API มาแสดงในหน้าเว็บ
      const responseBox = document.getElementById("api-response");
      if (data.success) {
        responseBox.innerHTML = `<p>Login successful! Welcome, ${data.username}</p>`;
        responseBox.style.color = "green";
      } else {
        responseBox.innerHTML = `<p>Error: ${data.message}</p>`;
        responseBox.style.color = "red";
      }
    })
    .catch(error => {
      // แสดงข้อผิดพลาดหากเกิดปัญหาในการเชื่อมต่อกับ API
      const responseBox = document.getElementById("api-response");
      responseBox.innerHTML = `<p>Failed to connect to the API: ${error.message}</p>`;
      responseBox.style.color = "red";
    });
  });
  