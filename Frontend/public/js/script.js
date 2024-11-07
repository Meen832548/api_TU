document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const apiUrl = "https://restapi.tu.ac.th/api/v1/auth/Ad/verify";
    const applicationKey = "TUd557d5627d777be13cccefa5a9cf99fd78b8f5b5acbb1117b7e37a6040c274022c050cfdc266eec0acd8d44c2aad3731"; 

    const requestBody = {
        UserName: username,
        PassWord: password
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Application-Key": applicationKey
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            handleErrorResponse(errorData);
            return; 
        }

        const data = await response.json();
        savedata(data);
        displayResponse(data);
        // Pass data to savedata function
    } catch (error) {
        alert("ไม่สามารถ login ได้");
        console.error("Error:", error);
        displayResponse({ status: false, message: "Network error. Please try again later." });
    }
});

function displayResponse(data) {
    const responseMessage = document.getElementById("responseMessage");

    if (data.status) {
        responseMessage.innerHTML = `<p style="color: green;">${data.message}</p>`;
        let userInfo = `<h3>User Information:</h3><ul>`;
        userInfo += `<li><strong>Student ID</strong> ${data.username || 'N/A'}</li>`;
        userInfo += `<li><strong>Name (Thai):</strong> ${data.displayname_th || 'N/A'}</li>`;
        userInfo += `<li><strong>Name (English):</strong> ${data.displayname_en || 'N/A'}</li>`;
        userInfo += `<li><strong>Email:</strong> ${data.email || 'N/A'}</li>`;
        userInfo += `<li><strong>Type:</strong> ${data.type || 'N/A'}</li>`;
        userInfo += `<li><strong>Status:</strong> ${data.tu_status || 'N/A'}</li>`;
        userInfo += `<li><strong>Department:</strong> ${data.department || 'N/A'}</li>`;
        userInfo += `<li><strong>Faculty/Organization:</strong> ${data.faculty || data.organization || 'N/A'}</li>`;
        userInfo += `</ul>`;
        
        responseMessage.innerHTML += userInfo;
    } else {
        responseMessage.innerHTML = `<p style="color: red;">${data.message}</p>`;
    }
}

function handleErrorResponse(errorData) {
    const responseMessage = document.getElementById("responseMessage");
    
    switch (errorData.status) {
        case false:
            if (errorData.message.alert("User or Password Invalid!")) {
                responseMessage.innerHTML = `<p style="color: red;">Username or password is incorrect.</p>`;
            } else if (errorData.message.alert("Could not read the request body!")) {
                responseMessage.innerHTML = `<p style="color: red;">Error reading request. Please check your input.</p>`;
            } else if (errorData.message.alert("The request body has error!")) {
                responseMessage.innerHTML = `<p style="color: red;">Invalid input. Please try again.</p>`;
            } else if (errorData.message.alert("invalid token")) {
                responseMessage.innerHTML = `<p style="color: red;">Invalid access token. Please contact support.</p>`;
            } else {
                responseMessage.innerHTML = `<p style="color: red;">${errorData.message}</p>`;
            }
            break;
        case 401:
            responseMessage.innerHTML = `<p style="color: red;">Unauthorized: Application-Key header required.</p>`;
            break;
        case 403:
            responseMessage.innerHTML = `<p style="color: red;">Forbidden: You are not authorized to access this resource.</p>`;
            break;
        default:
            responseMessage.innerHTML = `<p style="color: red;">An unknown error occurred. Please try again.</p>`;
            break;
    }
}

async function savedata(data) {
    const header={
        "Content-Type": "application/json"
    }
    const body = JSON.stringify({
        email: data.email,
        eng_name: data.displayname_en,
        faculty: data.faculty,
        type : data.type,
        user_name: data.displayname_th
    });
    const url ="http://localhost:8080/api/students/add"
    const response= await fetch(url, {
        method: "POST",
        headers: header,
        body: body,
       
    });
    
}
