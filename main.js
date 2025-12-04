// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 3000);
});

// Mobile menu
document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Countdown timer
let COUNTDOWN_TARGET = null;
function initCountdownTarget() {
    // Buscar la próxima función que sea futura (fecha + hora > ahora)
    const sorted = screenings.slice().sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
    const now = Date.now();
    const nextScreening = sorted.find(s => new Date(s.date + ' ' + s.time).getTime() > now);

    // Base de la fecha: si hay una próxima función futura, úsala; si no, usa ahora
    const ADD_DAYS = 20;
    const offsetMs = ADD_DAYS * 24 * 60 * 60 * 1000;

    let baseTime;
    if (nextScreening) {
        baseTime = new Date(nextScreening.date + ' ' + nextScreening.time).getTime();
    } else {
        baseTime = now;
    }

    COUNTDOWN_TARGET = baseTime + offsetMs;
    // show debug target on the page (if element exists)
    try {
        const debugEl = document.getElementById('countdown-debug');
        if (debugEl) debugEl.textContent = 'Cuenta regresiva hasta: ' + new Date(COUNTDOWN_TARGET).toLocaleString();
    } catch (e) {
        // ignore
    }
}

function updateCountdown() {
    if (!COUNTDOWN_TARGET) initCountdownTarget();

    const now = Date.now();
    let distance = COUNTDOWN_TARGET - now;

    // If already passed, show zeros and do not go negative
    if (distance <= 0) {
        distance = 0;
        // Optionally, you could reset COUNTDOWN_TARGET here if you want repeating behavior
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById('countdown-days')) {
        document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
        document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Load featured movies on home page
function loadFeaturedMovies() {
    const container = document.getElementById('featured-movies');
    if (!container) return;

    // Cambiar de .slice(0, 3) para mostrar las primeras 3 películas con upcoming: true
    const featuredMovies = movies.filter(m => m.upcoming).slice(0, 3);
    
    container.innerHTML = featuredMovies.map(movie => `
        <div class="movie-card group">
            <div class="relative aspect-[2/3] overflow-hidden rounded-t-2xl">
                <img src="${movie.poster}" alt="${movie.title}" />
                <div class="movie-overlay">
                    <div class="w-full space-y-2">
                        <div class="flex items-center justify-between">
                            <div class="stars-rating">
                                ${[...Array(5)].map((_, i) => `
                                    <svg class="star-icon ${i < Math.floor(movie.rating) ? '' : 'empty'}" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                `).join('')}
                            </div>
                            <span class="text-white font-bold">${movie.rating}</span>
                        </div>
                        <a href="cartelera.html" class="btn-small w-full flex items-center justify-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Ver Detalles
                        </a>
                    </div>
                </div>
            </div>
            <div class="p-4 bg-gray-800/50 rounded-b-2xl border border-gray-700 border-t-0">
                <h3 class="font-bold text-xl mb-2">${movie.title}</h3>
                <div class="flex flex-wrap gap-2 mb-3">
                    ${movie.genre.slice(0, 2).map(g => `
                        <span class="badge">${g}</span>
                    `).join('')}
                </div>
                <p class="text-sm text-gray-400 line-clamp-2">${movie.synopsis}</p>
            </div>
        </div>
    `).join('');
}

// Load next event info
function loadNextEvent() {
    const nextScreening = screenings
        .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time))[0];
    
    if (!nextScreening) return;

    const movie = movies.find(m => m.id === nextScreening.movieId);
    if (!movie) return;

    const titleEl = document.getElementById('next-movie-title');
    const dateEl = document.getElementById('next-movie-date');
    const locationEl = document.getElementById('next-movie-location');

    if (titleEl) titleEl.textContent = movie.title;
    if (locationEl) locationEl.textContent = nextScreening.location;
    
    if (dateEl) {
        const date = new Date(nextScreening.date);
        const dateStr = date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        dateEl.textContent = `${dateStr} - ${nextScreening.time}`;
    }
}

// Initialize home page
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    loadFeaturedMovies();
    loadNextEvent();
}

// Highlight active nav link
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

highlightActiveNav();

// Generate stars for background
function createStars() {
    const container = document.querySelector('.stars-container');
    if (!container) return;

    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 2 + 1;
        
        // Random duration and delay
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--opacity', Math.random());
        star.style.animationDelay = `${delay}s`;
        
        container.appendChild(star);
    }
}

window.addEventListener('load', createStars);