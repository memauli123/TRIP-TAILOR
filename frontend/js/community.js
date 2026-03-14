// frontend/js/community.js
const API_URL = 'http://localhost:5000/api/blogs';

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogs();
    
    if (!localStorage.getItem('token')) {
        document.getElementById('blog-form').style.display = 'none';
        document.getElementById('login-prompt').style.display = 'block';
    }
});

document.getElementById('blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const blogData = {
        title: document.getElementById('blog-title').value,
        location: document.getElementById('blog-location').value,
        image: document.getElementById('blog-image').value,
        content: document.getElementById('blog-content').value
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(blogData)
        });
        
        if (res.ok) {
            document.getElementById('blog-form').reset();
            fetchBlogs();
        }
    } catch (err) {
        console.error('Post failed', err);
    }
});

async function fetchBlogs() {
    try {
        const res = await fetch(API_URL);
        const blogs = await res.json();
        const container = document.getElementById('blog-feed');
        container.innerHTML = '';

        blogs.forEach(blog => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                ${blog.image ? `<img src="${blog.image}" loading="lazy">` : ''}
                <div class="card-content">
                    <h2>${blog.title}</h2>
                    <small>By ${blog.author.username} | 📍 ${blog.location}</small>
                    <p>${blog.content}</p>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error(err);
    }
}