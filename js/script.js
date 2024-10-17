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
    .then(response => {
      // ตรวจสอบสถานะของการตอบกลับ
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const responseBox = document.getElementById("api-response");

      // ตรวจสอบสถานะและจัดการข้อมูลที่ได้รับ
      if (data) {
        if (data.status) {
          const userData = data; // เข้าถึงข้อมูลของผู้ใช้

          responseBox.innerHTML = `
            <p>Login successful! Welcome, ${userData.displayname_th} (${userData.username})</p>
            <p>Email: ${userData.email}</p>
            <p>Faculty: ${userData.faculty}</p>
            <p>Department: ${userData.department}</p>
            <p>Status: ${userData.tu_status}</p>
          `;
          responseBox.style.color = "green";
        } else {
          // จัดการข้อความตอบกลับจาก API
          responseBox.innerHTML = `<p>Error: ${data.message || "Unknown error"}</p>`;
          responseBox.style.color = "red";
        }
      } else {
        responseBox.innerHTML = `<p>Error: Invalid response from API</p>`;
        responseBox.style.color = "red";
      }
    })
    .catch(error => {
      const responseBox = document.getElementById("api-response");
      responseBox.innerHTML = `<p>Failed to connect to the API: ${error.message}</p>`;
      responseBox.style.color = "red";
    });
});
