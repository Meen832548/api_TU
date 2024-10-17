// API Configuration
const API_URL = 'https://restapi.tu.ac.th/api/v1/auth/Ad/verify';
const ACCESS_TOKEN = 'TUd557d5627d777be13cccefa5a9cf99fd78b8f5b5acbb1117b7e37a6040c274022c050cfdc266eec0acd8d44c2aad3731'; // Replace with your actual access token

// DOM Elements
const loginForm = document.getElementById('loginForm');
const userInfo = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');

// User Info Elements
const elements = {
    nameTH: document.getElementById('nameTH'),
    nameEN: document.getElementById('nameEN'),
    email: document.getElementById('email'),
    type: document.getElementById('type'),
    department: document.getElementById('department'),
    faculty: document.getElementById('faculty'),
    organization: document.getElementById('organization')
};

// Handle Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': ACCESS_TOKEN
            },
            body: JSON.stringify({
                UserName: username,
                PassWord: password
            })
        });

        const data = await response.json();

        if (data.status) {
            // Show user info
            loginForm.classList.add('hidden');
            userInfo.classList.remove('hidden');
            
            // Update user information
            elements.nameTH.textContent = data.displayname_th;
            elements.nameEN.textContent = data.displayname_en;
            elements.email.textContent = data.email;
            elements.type.textContent = data.type;
            elements.department.textContent = data.department;
            
            if (data.type === 'student') {
                elements.faculty.textContent = data.faculty;
                elements.organization.parentElement.style.display = 'none';
            } else {
                elements.organization.textContent = data.organization;
                elements.faculty.parentElement.style.display = 'none';
            }
        } else {
            alert('Login failed: ' + (data.message || 'Invalid credentials'));
        }
    } catch (error) {
        alert('Error: ' + (error.message || 'An error occurred'));
    }
});

// Handle Logout
logoutBtn.addEventListener('click', () => {
    loginForm.reset();
    loginForm.classList.remove('hidden');
    userInfo.classList.add('hidden');
    elements.faculty.parentElement.style.display = '';
    elements.organization.parentElement.style.display = '';
});