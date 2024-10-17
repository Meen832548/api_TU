document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // แสดงข้อมูลที่ส่งไปในคอนโซล
    const requestBody = { UserName: username, PassWord: password };
    console.log(`Request body: ${JSON.stringify(requestBody)}`);

    fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Application-Key": "TUd557d5627d777be13cccefa5a9cf99fd78b8f5b5acbb1117b7e37a6040c274022c050cfdc266eec0acd8d44c2aad3731" // ใส่ Access Token ที่ถูกต้อง
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => {
        console.log(`HTTP Status: ${response.status}`); // แสดงสถานะการตอบกลับ
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // แสดงข้อมูลที่ตอบกลับจาก API
        const responseBox = document.getElementById("api-response");

        if (data && data.status) {
            const userData = data; // เข้าถึงข้อมูลของผู้ใช้
            if (userData.type === "student") {
                responseBox.innerHTML = `
                    <p>Login successful! Welcome, ${userData.displayname_th} (${userData.username})</p>
                    <p>Email: ${userData.email}</p>
                    <p>Faculty: ${userData.faculty}</p>
                    <p>Department: ${userData.department}</p>
                    <p>Status: ${userData.tu_status}</p>
                `;
            } else if (userData.type === "employee") {
                responseBox.innerHTML = `
                    <p>Login successful! Welcome, ${userData.displayname_th} (${userData.username})</p>
                    <p>Email: ${userData.email}</p>
                    <p>Department: ${userData.department}</p>
                    <p>Organization: ${userData.organization}</p>
                    <p>Status: ${userData.StatusEmp}</p>
                `;
            }
            responseBox.style.color = "green";
        } else {
            responseBox.innerHTML = `<p>Error: ${data.message || "Unknown error"}</p>`;
            responseBox.style.color = "red";
        }
    })
    .catch(error => {
        const responseBox = document.getElementById("api-response");
        responseBox.innerHTML = `<p>Failed to connect to the API: ${error.message}</p>`;
        responseBox.style.color = "red";
        console.error(error); // แสดงข้อผิดพลาดในคอนโซล
    });
});
