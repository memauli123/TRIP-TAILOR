// frontend/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    const token = localStorage.getItem('token');
    const authNav = document.getElementById('auth-nav');
    const profileLink = document.getElementById('profile-link');
    
    if (token) {
        if (authNav) {
            authNav.innerHTML = `<a href="#" id="logout-btn">Logout</a>`;
            document.getElementById('logout-btn').addEventListener('click', () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
            });
        }
        if (profileLink) {
            profileLink.style.display = 'inline-block';
        }
    }
});