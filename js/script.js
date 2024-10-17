document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const apiUrl = "https://restapi.tu.ac.th/api/v1/auth/Ad/verify";
    const applicationKey = "TUd557d5627d777be13cccefa5a9cf99fd78b8f5b5acbb1117b7e37a6040c274022c050cfdc266eec0acd8d44c2aad3731"; // Replace with your actual access token

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

        // Check for HTTP errors
        if (!response.ok) {
            const errorData = await response.json();
            handleErrorResponse(errorData);
            return; // Exit the function if there's an error
        }

        const data = await response.json();
        displayResponse(data);
    } catch (error) {
        console.error("Error:", error);
        displayResponse({ status: false, message: "Network error. Please try again later." });
    }
});

function displayResponse(data) {
    const responseMessage = document.getElementById("responseMessage");
    if (data.status) {
        responseMessage.innerHTML = `<p style="color: green;">${data.message}</p>`;
    } else {
        responseMessage.innerHTML = `<p style="color: red;">${data.message}</p>`;
    }
}

function handleErrorResponse(errorData) {
    const responseMessage = document.getElementById("responseMessage");
    
    switch (errorData.status) {
        case false:
            if (errorData.message.includes("User or Password Invalid!")) {
                responseMessage.innerHTML = `<p style="color: red;">Username or password is incorrect.</p>`;
            } else if (errorData.message.includes("Could not read the request body!")) {
                responseMessage.innerHTML = `<p style="color: red;">Error reading request. Please check your input.</p>`;
            } else if (errorData.message.includes("The request body has error!")) {
                responseMessage.innerHTML = `<p style="color: red;">Invalid input. Please try again.</p>`;
            } else if (errorData.message.includes("invalid token")) {
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
