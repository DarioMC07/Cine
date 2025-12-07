// Cargar lista de películas
function loadMoviesList() {
    const container = document.getElementById('movies-list');
    if (!container) return;

    // Grid responsive: 1 col en móvil, 2 en tablet, 3 en desktop
    container.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto';

    container.innerHTML = movies.map(movie => `
        <div class="bg-white/5 rounded-xl backdrop-blur shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-yellow-500/20 hover:-translate-y-1 flex flex-col">
            
            <!-- Poster -->
            <div class="relative aspect-[2/3] w-full overflow-hidden">
                <img src="${movie.poster}" alt="${movie.title}"
                    class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                ${movie.upcoming ? `<span class="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-md shadow">Próximamente</span>` : ''}
            </div>

            <!-- Info -->
            <div class="p-3 flex flex-col flex-1">
                <h3 class="text-sm font-bold line-clamp-1 mb-1">${movie.title}</h3>

                <div class="flex items-center justify-between text-[11px] text-gray-400 mb-2">
                    <span>${movie.year} • ${movie.duration}min</span>
                    <span class="flex items-center gap-1">
                        <svg class="w-3 h-3 fill-yellow-500" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span class="font-bold">${movie.rating}</span>
                    </span>
                </div>

                <!-- Botones -->
                <div class="mt-auto flex gap-2">
                    <button onclick="openTrailer('${movie.trailer}')"
                        class="flex-1 bg-white/10 hover:bg-white/20 transition text-xs py-1.5 rounded-md">
                        Trailer
                    </button>

                    <button onclick="openReserveModal(${movie.id})"
                        class="flex-1 bg-yellow-600 hover:bg-yellow-500 text-black transition text-xs font-bold py-1.5 rounded-md">
                        Ver Funciones
                    </button>
                </div>
            </div>

        </div>
    `).join('');
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

// Modal de funciones
function openReserveModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    const modal = document.getElementById('reserve-modal');
    const title = document.getElementById('reserve-movie-title');
    const screeningsList = document.getElementById('screenings-list');

    title.textContent = `Funciones - ${movie.title}`;

    const movieScreenings = screenings.filter(s => s.movieId === movieId);

    if (movieScreenings.length === 0) {
        screeningsList.innerHTML = `<p class="text-center text-gray-400 py-8">No hay funciones disponibles</p>`;
    } else {
        screeningsList.innerHTML = movieScreenings.map(screening => {
            const date = new Date(screening.date);
            const dateStr = date.toLocaleDateString('es-ES', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });

            return `
                <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p class="font-semibold text-lg capitalize">${dateStr}</p>
                    <p class="text-gray-400">Hora: ${screening.time} • ${screening.location}</p>
                    <p class="text-sm text-gray-400">${screening.availableSeats} asientos disponibles</p>
                </div>
            `;
        }).join('');
    }

    modal.classList.add('active');
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
