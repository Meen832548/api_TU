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
        console.error("Error:", error); // Log the error for debugging
        displayResponse({ status: false, message: "Network error. Please check your connection and try again." });
    }
});