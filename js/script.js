document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // ส่งข้อมูล username และ password ไปที่ API
    fetch("https://api.example.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  