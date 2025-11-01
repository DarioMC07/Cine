// Load movies list
function loadMoviesList() {
    const container = document.getElementById('movies-list');
    if (!container) return;

    container.innerHTML = movies.map(movie => `
        <div class="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-yellow-500 transition-colors">
            <div class="flex flex-col md:flex-row">
                <div class="md:w-1/3 relative aspect-[2/3] md:aspect-auto">
                    <img src="${movie.poster}" alt="${movie.title}" class="object-cover w-full h-full" />
                    ${movie.upcoming ? `
                        <span class="absolute top-4 right-4 badge">Próximamente</span>
                    ` : ''}
                </div>
                <div class="md:w-2/3 p-6 flex flex-col">
                    <div class="flex-1">
                        <div class="flex items-start justify-between mb-2">
                            <div>
                                <h3 class="text-2xl font-bold mb-1">${movie.title}</h3>
                                <p class="text-sm text-gray-400 italic">${movie.originalTitle}</p>
                            </div>
                            <div class="flex items-center space-x-1">
                                <svg class="w-5 h-5 fill-yellow-500 text-yellow-500" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="font-bold">${movie.rating}</span>
                            </div>
                        </div>
                        
                        <div class="flex flex-wrap gap-2 mb-3">
                            ${movie.genre.map(g => `<span class="badge">${g}</span>`).join('')}
                        </div>

                        <div class="space-y-2 mb-4 text-sm">
                            <p class="flex items-center text-gray-400">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                ${movie.year}
                            </p>
                            <p class="flex items-center text-gray-400">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                ${movie.duration} min
                            </p>
                            <p class="text-gray-400">
                                <span class="font-semibold">Director:</span> ${movie.director}
                            </p>
                        </div>

                        <p class="text-sm text-gray-400 mb-4 line-clamp-3">${movie.synopsis}</p>
                    </div>

                    <div class="flex gap-2">
                        <button onclick="openTrailer('${movie.trailer}')" class="btn-secondary flex-1 text-sm">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            </svg>
                            Ver Trailer
                        </button>
                        <button onclick="openReserveModal(${movie.id})" class="btn-small flex-1">
                            Reservar Entrada
                        </button>
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
                <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-yellow-500 transition-colors">
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

// Initialize
loadMoviesList();