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
