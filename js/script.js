// Configuration
const API_URL = 'https://restapi.tu.ac.th/api/v1/auth/Ad/verify';
const ACCESS_TOKEN = 'TUd557d5627d777be13cccefa5a9cf99fd78b8f5b5acbb1117b7e37a6040c274022c050cfdc266eec0acd8d44c2aad3731'; // Replace with your actual access token

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submitButton');
const buttonText = submitButton.querySelector('.button-text');
const loader = submitButton.querySelector('.loader');
const errorMessage = document.getElementById('errorMessage');
const userInfo = document.getElementById('userInfo');
const logoutButton = document.getElementById('logoutButton');

// User Info Elements
const userInfoFields = {
    nameTH: document.getElementById('nameTH'),
    nameEN: document.getElementById('nameEN'),
    email: document.getElementById('email'),
    userType: document.getElementById('userType'),
    department: document.getElementById('department'),
    faculty: document.getElementById('faculty'),
    organization: document.getElementById('organization'),
    facultyRow: document.getElementById('facultyRow'),
    organizationRow: document.getElementById('organizationRow')
};

// State Management
let isLoading = false;

// Helper Functions
const setLoading = (loading) => {
    isLoading = loading;
    submitButton.disabled = loading;
    buttonText.textContent = loading ? 'Logging in...' : 'Login';
    loader.classList.toggle('hidden', !loading);
};

const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
};

const hideError = () => {
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
};

const showUserInfo = (userData) => {
    loginForm.classList.add('hidden');
    userInfo.classList.remove('hidden');

    // Update user info display
    userInfoFields.nameTH.textContent = userData.displayname_th;
    userInfoFields.nameEN.textContent = userData.displayname_en;
    userInfoFields.email.textContent = userData.email;
    userInfoFields.userType.textContent = userData.type;
    userInfoFields.department.textContent = userData.department;

    // Show/hide faculty or organization based on user type
    if (userData.type === 'student') {
        userInfoFields.facultyRow.classList.remove('hidden');
        userInfoFields.organizationRow.classList.add('hidden');
        userInfoFields.faculty.textContent = userData.faculty;
    } else {
        userInfoFields.facultyRow.classList.add('hidden');
        userInfoFields.organizationRow.classList.remove('hidden');
        userInfoFields.organization.textContent = userData.organization;
    }
};

const resetForm = () => {
    loginForm.reset();
    hideError();
    userInfo.classList.add('hidden');
    loginForm.classList.remove('hidden');
};

// Event Handlers
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isLoading) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    hideError();
    setLoading(true);

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

        if (!response.ok) {
            throw new Error(data.message || 'Authentication failed');
        }

        if (data.status) {
            showUserInfo(data);
        } else {
            showError(data.message || 'Invalid credentials');
        }
    } catch (err) {
        showError(err.message || 'An error occurred during login');
    } finally {
        setLoading(false);
    }
});

logoutButton.addEventListener('click', resetForm);

// Input validation
usernameInput.addEventListener('input', () => {
    if (errorMessage.textContent) {
        hideError();
    }
});

passwordInput.addEventListener('input', () => {
    if (errorMessage.textContent) {
        hideError();
    }
});