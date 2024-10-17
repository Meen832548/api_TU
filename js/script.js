document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const apiUrl = "https://restapi.tu.ac.th/api/v1/auth/Ad/verify";
    const applicationKey = "YOUR_ACCESS_TOKEN"; // Replace with your actual access token

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
    
    // Log the full data response to console for debugging
    console.log("API Response:", data);
    
    if (data.status) {
        // Display success message and user information
        responseMessage.innerHTML = `
            <p style="color: green;">${data.message}</p>
            <h3>User Information:</h3>
            <ul>
                <li><strong>Username:</strong> ${data.username || 'N/A'}</li>
                <li><strong>Display Name (Thai):</strong> ${data.displayname_th || 'N/A'}</li>
                <li><strong>Display Name (English):</strong> ${data.displayname_en || 'N/A'}</li>
                <li><strong>Email:</strong> ${data.email || 'N/A'}</li>
                <li><strong>Type:</strong> ${data.type || 'N/A'}</li>
                <li><strong>Status:</strong> ${data.tu_status || data.StatusEmp || 'N/A'}</li>
                <li><strong>Department:</strong> ${data.department || 'N/A'}</li>
                <li><strong>Faculty/Organization:</strong> ${data.faculty || data.organization || 'N/A'}</li>
            </ul>
        `;
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
