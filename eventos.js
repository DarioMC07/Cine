// Get location screenings
function getLocationScreenings(locationName) {
    return screenings.filter(s => s.location === locationName);
}

// Load locations
function loadLocations() {
    const container = document.getElementById('locations-list');
    const countEl = document.getElementById('locations-count');
    
    if (countEl) {
        countEl.textContent = `${locations.length} Ubicaciones Únicas`;
    }

    if (!container) return;

    container.innerHTML = locations.map(location => {
        const locationScreenings = getLocationScreenings(location.name);
        const upcomingScreenings = locationScreenings.filter(s => {
            const screeningDate = new Date(s.date + ' ' + s.time);
            return screeningDate > new Date();
        }).slice(0, 3);

        return `
            <div class="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-yellow-500 transition-colors">
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-0">
                    <div class="lg:col-span-2 relative aspect-[16/9] lg:aspect-auto">
                        <img src="${location.image}" alt="${location.name}" class="object-cover w-full h-full" />
                        ${upcomingScreenings.length > 0 ? `
                            <span class="absolute top-4 left-4 bg-yellow-500 text-white text-lg py-2 px-4 rounded-lg font-semibold">
                                ${upcomingScreenings.length} ${upcomingScreenings.length === 1 ? 'evento próximo' : 'eventos próximos'}
                            </span>
                        ` : ''}
                    </div>

                    <div class="lg:col-span-3 p-8 space-y-6">
                        <div>
                            <div class="flex items-start justify-between mb-3 flex-wrap gap-4">
                                <div>
                                    <h3 class="text-3xl font-bold mb-2">${location.name}</h3>
                                    <p class="flex items-center text-gray-400">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        </svg>
                                        ${location.address}
                                    </p>
                                </div>
                                <div class="flex items-center space-x-2 text-gray-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    <span class="font-semibold">${location.capacity}</span>
                                </div>
                            </div>
                            <p class="text-gray-400">${location.description}</p>
                        </div>

                        <div>
                            <h4 class="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-400">Comodidades</h4>
                            <div class="grid grid-cols-2 gap-2">
                                ${location.amenities.map(amenity => `
                                    <div class="flex items-center space-x-2 text-sm">
                                        <svg class="w-4 h-4 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>${amenity}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        ${upcomingScreenings.length > 0 ? `
                            <div>
                                <h4 class="font-semibold mb-3 flex items-center">
                                    <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    Próximas Proyecciones
                                </h4>
                                <div class="space-y-2">
                                    ${upcomingScreenings.map(screening => {
                                        const movie = movies.find(m => m.id === screening.movieId);
                                        if (!movie) return '';

                                        const date = new Date(screening.date);
                                        const dateStr = date.toLocaleDateString('es-ES', {
                                            month: 'short',
                                            day: 'numeric'
                                        });

                                        return `
                                            <div class="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors">
                                                <div>
                                                    <p class="font-semibold">${movie.title}</p>
                                                    <p class="text-sm text-gray-400">
                                                        ${dateStr} • ${screening.time}
                                                    </p>
                                                </div>
                                                <span class="font-bold text-yellow-500">
                                                    Bs ${screening.price.toFixed(2)}
                                                </span>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                                <a href="calendario.html" class="block mt-3">
                                    <button class="btn-secondary w-full text-sm">
                                        Ver todas las proyecciones
                                    </button>
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize
loadLocations();