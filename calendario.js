// calendario.js (modificado para extender fechas hasta 10 nov 2025)

let selectedDate = null;

// Fecha final del calendario: ahora solo hasta el 7 de noviembre
const CALENDAR_END_DATE = '2025-11-07';

// Utility: convierte un Date a formato ISO (YYYY-MM-DD)
function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// Devuelve todas las fechas entre start y end inclusive,
// pero excluye el 23 de octubre
function getDatesBetween(startISO, endISO) {
    const res = [];
    const cur = new Date(startISO);
    const end = new Date(endISO);
    cur.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const excludedDates = ['2025-10-23']; // 🔹 Fechas que no se mostrarán

    while (cur <= end) {
        const iso = formatDateISO(cur);
        if (!excludedDates.includes(iso)) {
            res.push(iso);
        }
        cur.setDate(cur.getDate() + 1);
    }

    return res;
}

// Agrupa las proyecciones por fecha y asegura el rango hasta el 7 de noviembre
function groupScreeningsByDate() {
    const grouped = {};
    (screenings || []).forEach(screening => {
        if (!grouped[screening.date]) {
            grouped[screening.date] = [];
        }
        grouped[screening.date].push(screening);
    });

    // Determinar inicio (24 oct si no hay screenings anteriores)
    const existingDates = Object.keys(grouped).sort();
    let startDateISO = existingDates.length > 0 ? existingDates[0] : '2025-10-24';

    // Generar rango hasta el 7 de noviembre (sin 23 oct)
    const allDates = getDatesBetween(startDateISO, CALENDAR_END_DATE);

    // Completar días vacíos
    allDates.forEach(d => {
        if (!grouped[d]) grouped[d] = [];
    });

    return grouped;
}



// Group screenings by date and ensure range goes until CALENDAR_END_DATE
function groupScreeningsByDate() {
    const grouped = {};
    // Agrupar proyecciones existentes
    (screenings || []).forEach(screening => {
        if (!grouped[screening.date]) {
            grouped[screening.date] = [];
        }
        grouped[screening.date].push(screening);
    });

    // Si no hay screenings, aún queremos mostrar el rango (desde hoy o desde 2025-10-24?)
    const existingDates = Object.keys(grouped).sort();
    let startDateISO;

    if (existingDates.length > 0) {
        startDateISO = existingDates[0];
    } else {
        // si no hay proyecciones, toma como inicio hoy (o cámbialo a la fecha que quieras)
        const today = new Date();
        startDateISO = formatDateISO(today);
    }

    // Decide fecha final (constante o la máxima existente si es mayor)
    const maxExisting = existingDates.length > 0 ? existingDates[existingDates.length - 1] : startDateISO;
    // queremos que la fecha final sea al menos CALENDAR_END_DATE
    const finalDateISO = (new Date(maxExisting) > new Date(CALENDAR_END_DATE)) ? maxExisting : CALENDAR_END_DATE;

    // Rellenar días intermedios que falten entre startDateISO y finalDateISO
    const allDates = getDatesBetween(startDateISO, finalDateISO);
    allDates.forEach(d => {
        if (!grouped[d]) grouped[d] = [];
    });

    return grouped;
}

// Load date filters
function loadDateFilters() {
    const container = document.getElementById('date-filters');
    if (!container) return;

    const groupedScreenings = groupScreeningsByDate();
    const dates = Object.keys(groupedScreenings).sort();

    const buttons = dates.map(date => {
        const dateObj = new Date(date);
        const month = dateObj.toLocaleDateString('es-ES', { month: 'short' });
        const day = dateObj.getDate();

        return `
            <button 
                onclick="filterByDate('${date}')" 
                class="date-filter-btn flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${selectedDate === date ? 'bg-yellow-500 border-yellow-500 text-white' : 'bg-gray-800/50 border-gray-700 hover:border-yellow-500'}"
            >
                <div class="flex flex-col items-center">
                    <span class="text-xs ${selectedDate === date ? 'opacity-90' : 'opacity-70'}">${month}</span>
                    <span class="text-xl font-bold">${day}</span>
                </div>
            </button>
        `;
    }).join('');

    container.innerHTML = `
        <button 
            onclick="filterByDate(null)" 
            class="date-filter-btn px-4 py-2 rounded-lg border transition-colors ${selectedDate === null ? 'bg-yellow-500 border-yellow-500 text-white' : 'bg-gray-800/50 border-gray-700 hover:border-yellow-500'}"
        >
            Todas las fechas
        </button>
        ${buttons}
    `;
}

// Filter by date
function filterByDate(date) {
    selectedDate = date;
    loadDateFilters();
    loadCalendar();
}

// Load calendar content
function loadCalendar() {
    const container = document.getElementById('calendar-content');
    if (!container) return;

    const groupedScreenings = groupScreeningsByDate();
    const dates = Object.keys(groupedScreenings).sort();

    if (selectedDate === null) {
        // Show all dates
        container.innerHTML = dates.map(date => {
            const dateObj = new Date(date);
            const dateStr = dateObj.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const month = dateObj.toLocaleDateString('es-ES', { month: 'short' });
            const day = dateObj.getDate();

            const dayScreenings = groupedScreenings[date];

            return `
                <div class="space-y-4">
                    <div class="flex items-center space-x-3">
                        <div class="flex flex-col items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-lg border-2 border-yellow-500">
                            <span class="text-xs text-gray-400 uppercase">${month}</span>
                            <span class="text-2xl font-bold text-yellow-500">${day}</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold capitalize">${dateStr}</h3>
                            <p class="text-gray-400">
                                ${dayScreenings.length} ${dayScreenings.length === 1 ? 'proyección' : 'proyecciones'}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${renderScreeningCards(dayScreenings)}
                    </div>
                </div>
            `;
        }).join('');
    } else {
        // Show selected date
        const dateObj = new Date(selectedDate);
        const dateStr = dateObj.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const month = dateObj.toLocaleDateString('es-ES', { month: 'short' });
        const day = dateObj.getDate();
        const dayScreenings = groupedScreenings[selectedDate] || [];

        container.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center space-x-3 mb-6">
                    <div class="flex flex-col items-center justify-center w-20 h-20 bg-yellow-500/20 rounded-lg border-2 border-yellow-500">
                        <span class="text-sm text-gray-400 uppercase">${month}</span>
                        <span class="text-3xl font-bold text-yellow-500">${day}</span>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold capitalize">${dateStr}</h3>
                        <p class="text-gray-400">
                            ${dayScreenings.length} ${dayScreenings.length === 1 ? 'proyección programada' : 'proyecciones programadas'}
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${renderDetailedScreenings(dayScreenings)}
                </div>
            </div>
        `;
    }
}

// Render screening cards (compact view)
function renderScreeningCards(screeningsList) {
    return screeningsList.map(screening => {
        const movie = movies.find(m => m.id === screening.movieId);
        if (!movie) return '';

        return `
            <div class="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-yellow-500 transition-colors group">
                <div class="relative aspect-video">
                    <img src="${movie.poster}" alt="${movie.title}" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                    <div class="absolute top-2 right-2">
                        <span class="badge bg-yellow-500 border-pink-500 text-white">
                            ${screening.time || ''}
                        </span>
                    </div>
                </div>
                <div class="p-4 space-y-3">
                    <h4 class="font-bold text-lg">${movie.title}</h4>
                    
                    <div class="space-y-2 text-sm">
                        <p class="flex items-center text-gray-400">
                            <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            ${screening.time ? `${screening.time} • ${movie.duration} min` : `Sin horario • ${movie.duration} min`}
                        </p>
                        <p class="flex items-center text-gray-400">
                            <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            </svg>
                            ${screening.location || ''}
                        </p>
                        <p class="flex items-center text-gray-400">
                            <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                            </svg>
                            ${typeof screening.availableSeats !== 'undefined' ? `${screening.availableSeats} asientos disponibles` : ''}
                        </p>
                    </div>

                    <div class="flex items-center justify-between pt-2">
                        <span class="text-2xl font-bold text-yellow-500">
                            ${typeof screening.price === 'number' ? `Bs ${screening.price.toFixed(2)}` : ''}
                        </span>
                        <button onclick="alert('¡Reserva confirmada!')" class="btn-small">
                            Reservar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render detailed screenings (expanded view)
function renderDetailedScreenings(screeningsList) {
    return screeningsList.map(screening => {
        const movie = movies.find(m => m.id === screening.movieId);
        if (!movie) return '';

        return `
            <div class="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-pink-500 transition-colors">
                <div class="flex flex-col sm:flex-row">
                    <div class="sm:w-1/3 relative aspect-[2/3] sm:aspect-auto">
                        <img src="${movie.poster}" alt="${movie.title}" class="object-cover w-full h-full" />
                    </div>
                    <div class="sm:w-2/3 p-6 flex flex-col">
                        <div class="flex-1 space-y-3">
                            <h4 class="font-bold text-2xl">${movie.title}</h4>
                            
                            <div class="flex flex-wrap gap-2">
                                ${movie.genre.slice(0, 3).map(g => `<span class="badge">${g}</span>`).join('')}
                            </div>

                            <div class="space-y-2 text-sm">
                                <p class="flex items-center">
                                    <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span class="font-semibold">${screening.time || 'Sin horario'}</span>
                                    <span class="text-gray-400 ml-2">• ${movie.duration} min</span>
                                </p>
                                <p class="flex items-center text-gray-400">
                                    <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    </svg>
                                    ${screening.location || ''}
                                </p>
                                <p class="flex items-center text-gray-400">
                                    <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                                    </svg>
                                    ${typeof screening.availableSeats !== 'undefined' ? `${screening.availableSeats} asientos disponibles` : ''}
                                </p>
                            </div>

                            <p class="text-sm text-gray-400 line-clamp-2">${movie.synopsis}</p>
                        </div>

                        <div class="flex items-center justify-between pt-4 mt-auto">
                            <span class="text-3xl font-bold text-yellow-500">
                                ${typeof screening.price === 'number' ? `Bs ${screening.price.toFixed(2)}` : ''}
                            </span>
                            <button onclick="alert('¡Reserva confirmada!')" class="btn-small">
                                Comprar Entrada
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize
loadDateFilters();
loadCalendar();
