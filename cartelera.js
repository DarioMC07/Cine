// Cargar lista de películas
function loadMoviesList() {
    const container = document.getElementById('movies-list');
    if (!container) return;

    // Grid responsive: 2 columnas en móvil, 3 en tablet, 4 en desktop
    container.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-7xl mx-auto';

    container.innerHTML = movies.map(movie => `
        <div class="group cursor-pointer h-full flex flex-col" onclick="toggleMovieExpand(this, ${movie.id})">
            
            <!-- Card Container -->
            <div class="bg-gradient-to-b from-white/10 to-white/5 rounded-xl backdrop-blur shadow-lg overflow-hidden transition-all duration-300 hover:shadow-yellow-500/30 hover:from-white/15 hover:to-white/10 flex flex-col h-full">
                
                <!-- Poster -->
                <div class="relative aspect-[2/3] w-full overflow-hidden bg-black/30">
                    <img src="${movie.poster}" alt="${movie.title}"
                        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                    ${movie.upcoming ? `
                        <span class="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">Próximamente</span>
                    ` : `
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <svg class="w-12 h-12 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    `}
                </div>

                <!-- Info -->
                <div class="p-3 flex flex-col flex-1">
                    <h3 class="text-xs font-bold line-clamp-2 mb-1 text-white">${movie.title}</h3>

                    <div class="flex items-center justify-between text-[10px] text-gray-400 mb-2">
                        <span>${movie.year}</span>
                        <span class="flex items-center gap-0.5">
                            <svg class="w-2.5 h-2.5 fill-yellow-500" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            ${movie.rating}
                        </span>
                    </div>

                    <!-- Botones (ocultos inicialmente) -->
                    <div class="movie-buttons mt-auto flex gap-2 opacity-0 transform translate-y-2 transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                        <button onclick="event.stopPropagation(); openTrailer('${movie.trailer}')"
                            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition text-[10px] py-1.5 rounded-md font-semibold shadow-lg">
                            🎬 Trailer
                        </button>

                        <button onclick="event.stopPropagation(); openReserveModal(${movie.id})"
                            class="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black transition text-[10px] font-bold py-1.5 rounded-md shadow-lg">
                            🎫 Reservar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `).join('');
}

// Alternar expansión de película
function toggleMovieExpand(element, movieId) {
    // Cerrar otras películas expandidas
    document.querySelectorAll('.movie-expanded').forEach(el => {
        if (el !== element) {
            el.classList.remove('movie-expanded');
        }
    });
    
    // Expandir/contraer esta película
    element.classList.toggle('movie-expanded');
}

// Modal de trailer
function openTrailer(trailerId) {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');
    iframe.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1`;
    modal.classList.add('active');
}

function closeTrailerModal() {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');
    iframe.src = '';
    modal.classList.remove('active');
}

// Modal de reserva mejorado
function openReserveModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    const modal = document.getElementById('reserve-modal');
    const title = document.getElementById('reserve-movie-title');
    const screeningsList = document.getElementById('screenings-list');

    title.innerHTML = `🎬 ${movie.title}`;

    const movieScreenings = screenings.filter(s => s.movieId === movieId);

    if (movieScreenings.length === 0) {
        screeningsList.innerHTML = `<p class="text-center text-gray-400 py-12 text-sm">No hay funciones disponibles en este momento</p>`;
    } else {
        screeningsList.innerHTML = movieScreenings.map(screening => {
            const date = new Date(screening.date);
            const dateStr = date.toLocaleDateString('es-ES', {
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
            });

            return `
                <div class="p-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5 border border-yellow-500/30 hover:border-yellow-500/60 transition cursor-pointer group">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p class="font-bold text-white capitalize mb-1">${dateStr}</p>
                            <div class="flex gap-4 text-xs text-gray-400">
                                <span>⏰ ${screening.time}</span>
                                <span>📍 ${screening.location}</span>
                                <span>🪑 ${screening.availableSeats} disponibles</span>
                            </div>
                        </div>
                        <button class="ml-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition transform group-hover:scale-105"
                            onclick="confirmReservation(${movieId}, '${screening.time}', '${screening.location}')">
                            Reservar
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    modal.classList.add('active');
}

function confirmReservation(movieId, time, location) {
    const movie = movies.find(m => m.id === movieId);
    alert(`✅ Reserva confirmada!\n\nPelícula: ${movie.title}\nHora: ${time}\nLugar: ${location}\n\nTe enviaremos los detalles al correo registrado.`);
    closeReserveModal();
}

function closeReserveModal() {
    document.getElementById('reserve-modal').classList.remove('active');
}

// Click afuera cierra modal
['trailer-modal','reserve-modal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', e => {
        if (e.target.id === id) {
            id === 'trailer-modal' ? closeTrailerModal() : closeReserveModal();
        }
    });
});

// Inicializar cartelera
loadMoviesList();
