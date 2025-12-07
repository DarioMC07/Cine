// Load movies list
function loadMoviesList() {
    const container = document.getElementById('movies-list');
    if (!container) return;

    // Set grid layout on container - 2 columnas compactas
    container.className = 'grid grid-cols-2 md:grid-cols-2 gap-3 max-w-4xl mx-auto';

    container.innerHTML = movies.map(movie => `
        <div class="glass-card overflow-hidden group rounded-lg flex flex-col h-full">
            <div class="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-yellow-500/20 to-amber-500/20 max-h-64">
                <img src="${movie.poster}" alt="${movie.title}" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                ${movie.upcoming ? `
                    <span class="absolute top-2 right-2 badge text-xs">Próximamente</span>
                ` : ''}
            </div>
            <div class="p-2 flex flex-col flex-grow">
                <div class="flex-1">
                    <div class="mb-1">
                        <h3 class="text-sm font-bold line-clamp-1">${movie.title}</h3>
                        <div class="flex items-center justify-between gap-1">
                            <p class="text-xs text-gray-400">${movie.year} • ${movie.duration}min</p>
                            <div class="flex items-center space-x-1">
                                <svg class="w-3 h-3 fill-yellow-500" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="text-xs font-bold">${movie.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex gap-1 mt-auto">
                    <button onclick="openTrailer('${movie.trailer}')" aria-label="Ver trailer de ${movie.title}" class="btn-secondary flex-1 text-xs py-1.5 flex items-center justify-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                        Trailer
                    </button>
                    <button onclick="openReserveModal(${movie.id})" aria-label="Reservar entrada para ${movie.title}" class="btn-small flex-1 text-xs py-1.5">
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open trailer modal
function openTrailer(trailerId) {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');

    iframe.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1`;
    modal.classList.add('active');
}

// Close trailer modal
function closeTrailerModal() {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');

    iframe.src = '';
    modal.classList.remove('active');
}

// Open reserve modal
function openReserveModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    const modal = document.getElementById('reserve-modal');
    const title = document.getElementById('reserve-movie-title');
    const screeningsList = document.getElementById('screenings-list');

    title.textContent = `Reservar Entrada - ${movie.title}`;

    const movieScreenings = screenings.filter(s => s.movieId === movieId);

    if (movieScreenings.length === 0) {
        screeningsList.innerHTML = `
            <p class="text-center text-gray-400 py-8">
                No hay funciones disponibles para esta película
            </p>
        `;
    } else {
        screeningsList.innerHTML = movieScreenings.map(screening => {
            const date = new Date(screening.date);
            const dateStr = date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            return `
                <div class="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-colors">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div class="flex-1">
                            <p class="font-semibold text-lg capitalize">${dateStr}</p>
                            <p class="text-gray-400">
                                Hora: ${screening.time} • ${screening.location}
                            </p>
                            <p class="text-sm text-gray-400">
                                ${screening.availableSeats} asientos disponibles
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-yellow-500 mb-2">
                                Bs ${screening.price.toFixed(2)}
                            </p>
                            <button onclick="buyTicket(${screening.id})" class="btn-small">
                                Comprar
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    modal.classList.add('active');
}

// Close reserve modal
function closeReserveModal() {
    const modal = document.getElementById('reserve-modal');
    modal.classList.remove('active');
}

// Buy ticket function
function buyTicket(screeningId) {
    alert('¡Reserva confirmada! En una aplicación real, esto procesaría el pago.');
    closeReserveModal();
}

// Close modals when clicking outside
document.getElementById('trailer-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'trailer-modal') {
        closeTrailerModal();
    }
});

document.getElementById('reserve-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'reserve-modal') {
        closeReserveModal();
    }
});

// Close modal buttons (any element with .modal-close)
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // try to close nearest modal
        const modal = btn.closest('.modal');
        if (modal) {
            if (modal.id === 'trailer-modal') closeTrailerModal();
            else if (modal.id === 'reserve-modal') closeReserveModal();
            else modal.classList.remove('active');
        }
    });
});

// Initialize
loadMoviesList();

// If a movie id is provided in the query string (e.g. ?movie=3), open its reserve modal
(function openReserveFromQuery() {
    try {
        const params = new URLSearchParams(window.location.search);
        const movieParam = params.get('movie');
        if (movieParam) {
            const id = Number(movieParam);
            if (!Number.isNaN(id)) {
                // wait a moment so the DOM and modals are ready
                setTimeout(() => {
                    openReserveModal(id);
                    // optionally scroll to top so modal is visible on some mobile browsers
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 300);
            }
        }
    } catch (e) {
        // ignore
    }
})();