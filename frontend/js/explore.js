// frontend/js/explore.js
const API_URL = 'http://localhost:5000/api/explore';

document.getElementById('search-btn').addEventListener('click', fetchResults);

async function fetchResults() {
    const type = document.getElementById('type-filter').value;
    const search = document.getElementById('search-input').value;
    
    try {
        const res = await fetch(`${API_URL}/${type}?search=${search}`);
        const data = await res.json();
        renderCards(data, type);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

function renderCards(items, type) {
    const container = document.getElementById('results-container');
    container.innerHTML = '';
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${item.imageUrl || 'https://via.placeholder.com/300'}" alt="${item.name}" loading="lazy">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>📍 ${item.city || item.location}</p>
                <p>⭐ ${item.rating || item.reviewRating || 'N/A'}</p>
                <a href="${item.googleMapsLink || `https://www.google.com/maps/search/?api=1&query=${item.name}`}" target="_blank">View on Map</a>
            </div>
        `;
        container.appendChild(div);
    });
}

// Initial fetch
fetchResults();