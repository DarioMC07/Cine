// Load movies list
function loadMoviesList() {
    const container = document.getElementById('movies-list');
    if (!container) return;

    // Grid responsive bien balanceado
    container.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4';

    container.innerHTML = movies.map(movie => `
        <div class="group rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/50">
            <!-- Card Container -->
            <div class="bg-gradient-to-b from-white/5 to-white/0 rounded-lg overflow-hidden flex flex-col h-full">
                
                <!-- Poster Image (proporción 2:3) -->
                <div class="relative aspect-[2/3] overflow-hidden bg-black/40 flex-shrink-0">
                    <img src="${movie.poster}" alt="${movie.title}" 
                         class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-115" />
                    
                    <!-- Badge Próximo -->
                    ${movie.upcoming ? `
                        <span class="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">Próximo</span>
                    ` : ''}
                    
                    <!-- Overlay con info al hover -->
                    <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3">
                        
                        <!-- Título y Rating -->
                        <div>
                            <h3 class="text-white text-[11px] font-bold line-clamp-2 mb-2 leading-tight">${movie.title}</h3>
                            <div class="flex items-center gap-1">
                                <svg class="w-3 h-3 fill-yellow-500" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="text-white text-[10px] font-bold">${movie.rating}</span>
                            </div>
                        </div>

                        <!-- Info y Botones -->
                        <div class="space-y-2">
                            <div class="text-[9px] text-gray-300 space-y-0.5">
                                <p>${movie.year} • ${movie.duration}min</p>
                                <p class="line-clamp-1">${movie.genre[0]}</p>
                            </div>
                            
                            <div class="flex gap-2 pt-2">
                                <button onclick="event.stopPropagation(); openTrailer('${movie.trailer}')" 
                                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold py-1.5 rounded transition-colors">
                                    ▶ Trailer
                                </button>
                                <button onclick="event.stopPropagation(); openReserveModal(${movie.id})" 
                                    class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-[9px] font-bold py-1.5 rounded transition-colors">
                                    🎫 Reservar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Info Footer (siempre visible) -->
                <div class="p-2.5 bg-black/40 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 class="text-white text-[10px] font-bold line-clamp-1 mb-1">${movie.title}</h3>
                        <div class="flex items-center justify-between text-[8px] text-gray-400">
                            <span>${movie.year}</span>
                            <span class="flex items-center gap-0.5">
                                <svg class="w-2.5 h-2.5 fill-yellow-500" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="font-bold">${movie.rating}</span>
                            </span>
                        </div>
                    </div>
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

    title.innerHTML = `🎬 ${movie.title}`;

    const movieScreenings = screenings.filter(s => s.movieId === movieId);

    if (movieScreenings.length === 0) {
        screeningsList.innerHTML = `
            <div class="text-center py-12">
                <p class="text-gray-400 text-sm">No hay funciones disponibles para esta película</p>
            </div>
        `;
    } else {
        screeningsList.innerHTML = movieScreenings.map(screening => {
            const date = new Date(screening.date);
            const dateStr = date.toLocaleDateString('es-ES', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            return `
                <div class="p-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5 border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300">
                    <div class="flex items-start justify-between gap-3 flex-wrap">
                        <div class="flex-1 min-w-[200px]">
                            <p class="font-semibold text-white text-sm capitalize mb-1">${dateStr}</p>
                            <div class="space-y-1 text-xs text-gray-400">
                                <p>⏰ ${screening.time}</p>
                                <p>📍 ${screening.location}</p>
                                <p>🪑 ${screening.availableSeats} asientos disponibles</p>
                            </div>
                        </div>
                        <div class="text-right flex flex-col items-end gap-2">
                            <p class="text-lg font-bold text-yellow-500">Bs ${screening.price.toFixed(2)}</p>
                            <button onclick="buyTicket(${screening.id})" 
                                class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 text-sm">
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
    alert('✅ ¡Reserva confirmada! En una aplicación real, esto procesaría el pago.');
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

// Close modal buttons
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
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
                setTimeout(() => {
                    openReserveModal(id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 300);
            }
        }
    } catch (e) {
        // ignore
    }
})();