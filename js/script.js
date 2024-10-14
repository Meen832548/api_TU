document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const username = event.target.username.value;
    const password = event.target.password.value;

    const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
    } else {
        console.error('Login failed:', response.statusText);
    }
});
