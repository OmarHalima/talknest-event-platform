// Authentication utilities

// Check if user is logged in
function isLoggedIn() {
    return sessionStorage.getItem('currentUser') !== null;
}

// Get current user data
function getCurrentUser() {
    const userData = sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Sign out functionality
function signOut() {
    // Remove user data from session storage
    sessionStorage.removeItem('currentUser');
    
    // Redirect to home page
    window.location.href = 'home.html';
}

// Update UI based on login status
function updateUIForAuthState() {
    const loggedIn = isLoggedIn();
    const currentUser = getCurrentUser();
    
    // Elements to update
    const loginButtons = document.querySelectorAll('.login-btn');
    const profileButtons = document.querySelectorAll('.profile-btn');
    const signOutButtons = document.querySelectorAll('.signout-btn');
    const userNameElements = document.querySelectorAll('.user-name');
    
    if (loggedIn && currentUser) {
        // User is logged in
        
        // Hide login buttons
        loginButtons.forEach(btn => {
            if (btn) btn.style.display = 'none';
        });
        
        // Show profile and sign out buttons
        profileButtons.forEach(btn => {
            if (btn) btn.style.display = 'inline-block';
        });
        
        signOutButtons.forEach(btn => {
            if (btn) {
                btn.style.display = 'inline-block';
                btn.addEventListener('click', signOut);
            }
        });
        
        // Update user name elements
        userNameElements.forEach(el => {
            if (el) el.textContent = currentUser.fullName;
        });
    } else {
        // User is not logged in
        
        // Show login buttons
        loginButtons.forEach(btn => {
            if (btn) btn.style.display = 'inline-block';
        });
        
        // Hide profile and sign out buttons
        profileButtons.forEach(btn => {
            if (btn) btn.style.display = 'none';
        });
        
        signOutButtons.forEach(btn => {
            if (btn) btn.style.display = 'none';
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', updateUIForAuthState); 