// Authentication handling
class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.user = null;
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        const user = localStorage.getItem('user');
        if (user) {
            this.isAuthenticated = true;
            this.user = JSON.parse(user);
            if (window.location.pathname.includes('login.html') || 
                window.location.pathname.includes('register.html')) {
                window.location.href = 'index.html';
            }
        } else if (!window.location.pathname.includes('login.html') && 
                   !window.location.pathname.includes('register.html')) {
            window.location.href = 'login.html';
        }
    }

    async login(email, password) {
        // In a real application, this would make an API call to your backend
        try {
            // Simulated authentication
            const user = {
                email: email,
                name: email.split('@')[0]
            };
            localStorage.setItem('user', JSON.stringify(user));
            this.isAuthenticated = true;
            this.user = user;
            window.location.href = 'index.html';
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    async register(name, email, password) {
        // In a real application, this would make an API call to your backend
        try {
            const user = {
                name: name,
                email: email
            };
            localStorage.setItem('user', JSON.stringify(user));
            this.isAuthenticated = true;
            this.user = user;
            window.location.href = 'index.html';
        } catch (error) {
            throw new Error('Registration failed');
        }
    }

    logout() {
        console.log('Logging out...');
        localStorage.removeItem('user');
        this.isAuthenticated = false;
        this.user = null;
        window.location.replace('login.html');
        localStorage.removeItem('user');
        this.isAuthenticated = false;
        this.user = null;
        window.location.href = 'login.html';
    }
}

const auth = new Auth();

// Event listeners for forms
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                await auth.login(email, password);
            } catch (error) {
                alert(error.message);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                await auth.register(name, email, password);
            } catch (error) {
                alert(error.message);
            }
        });
    }
});
