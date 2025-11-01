// Datos de películas
const movies = [
    {
        id: 1,
        title: "Interestelar",
        originalTitle: "Interstellar",
        year: 2014,
        duration: 169,
        genre: ["Ciencia Ficción", "Drama", "Aventura"],
        director: "Christopher Nolan",
        rating: 4.8,
        synopsis: "Un grupo de exploradores espaciales viaja a través de un agujero de gusano en el espacio en un intento de garantizar la supervivencia de la humanidad.",
        poster: "/public/images/interestelar.jpg",
        trailer: "zSWdZVtXT7E",
        upcoming: false
    },
    {
        id: 2,
        title: "El Gran Gatsby",
        originalTitle: "The Great Gatsby",
        year: 2013,
        duration: 143,
        genre: ["Drama", "Romance"],
        director: "Baz Luhrmann",
        rating: 4.3,
        synopsis: "Un escritor y corredor de bolsa, Nick Carraway, encuentra el camino al mundo del misterioso millonario Jay Gatsby y su amor por Daisy Buchanan.",
        poster: "/public/images/Gastby.jpg",
        trailer: "rARN6agiW7o",
        upcoming: false
    },
    {
        id: 3,
        title: "La La Land",
        originalTitle: "La La Land",
        year: 2016,
        duration: 128,
        genre: ["Musical", "Romance", "Drama"],
        director: "Damien Chazelle",
        rating: 4.6,
        synopsis: "Una historia de amor entre un pianista de jazz y una actriz aspirante en Los Ángeles mientras persiguen sus sueños en una ciudad conocida por destruir esperanzas y romper corazones.",
        poster: "/public/images/la la land.jpg",
        trailer: "0pdqf4P9MB8",
        upcoming: false
    },
    {
        id: 4,
        title: "Blade Runner 2049",
        originalTitle: "Blade Runner 2049",
        year: 2017,
        duration: 164,
        genre: ["Ciencia Ficción", "Thriller"],
        director: "Denis Villeneuve",
        rating: 4.7,
        synopsis: "Un nuevo blade runner descubre un secreto largamente oculto que tiene el potencial de sumir lo que queda de la sociedad en el caos.",
        poster: "/public/images/blade.jpg",
        trailer: "gCcx85zbxz4",
        upcoming: true
    },
    {
        id: 5,
        title: "El Caballero de la Noche",
        originalTitle: "The Dark Knight",
        year: 2008,
        duration: 152,
        genre: ["Acción", "Crimen", "Drama"],
        director: "Christopher Nolan",
        rating: 4.9,
        synopsis: "Cuando la amenaza conocida como el Joker causa estragos y caos en la gente de Gotham, Batman debe aceptar una de las pruebas psicológicas y físicas más grandes de su capacidad para luchar contra la injusticia.",
        poster: "/public/images/batman.png",
        trailer: "EXeTwQWrcwY",
        upcoming: false
    },
    {
        id: 6,
        title: "Dune",
        originalTitle: "Dune",
        year: 2021,
        duration: 155,
        genre: ["Ciencia Ficción", "Aventura"],
        director: "Denis Villeneuve",
        rating: 4.5,
        synopsis: "Paul Atreides, un joven brillante y talentoso nacido con un gran destino, debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.",
        poster: "/public/images/dune.jpg",
        trailer: "8g18jFHCLXk",
        upcoming: true
    },
    {
        id: 7,
        title: "Happy Gilmore 2",
        originalTitle: "Happy Gilmore 2",
        year: 2025,
        duration: 148,
        genre: ["Comedia", "Familiar", "Drama"],
        director: "Kyle Newacheck",
        rating: 4.8,
        synopsis: "El temperamental Happy Gilmore debe mantener la compostura en su regreso al campo de golf para ayudar a su hija a cumplir sus sueños.",
        poster: "/public/images/happy.jpg",
        trailer: "UNFUzrVrmgQ",
        upcoming: true
    },
    {
        id: 8,
        title: "Amenaza En El Aire ",
        originalTitle: "Amenaza En El Aire (Flight Risk)",
        year: 2025,
        duration: 132,
        genre: ["Drama", "Thriller", "Acción"],
        director: "Mel Gibson",
        rating: 4.9,
        synopsis: "Michelle, una agente del Gobierno, debe escoltar durante un vuelo a Winston, un criminal que ha aceptado ofrecer testimonio en un caso que incrimina a un jefe de la mafia. Michelle descubre que el piloto es un sicario contratado para matar a Winston.",
        poster: "/public/images/Ame.jpg",
        trailer: "8D7mzasIQMU",
        upcoming: false
    }
];

// Datos de proyecciones
const screenings = [
    {
        id: 1,
        movieId: 1,
        date: "2025-10-24",
        time: "20:30",
        location: "Urubó Village",
        availableSeats: 45,
        price: 85.00
    },
    {
        id: 2,
        movieId: 2,
        date: "2025-10-25",
        time: "21:00",
        location: "Jardín Botánico",
        availableSeats: 30,
        price: 100.00
    },
    {
        id: 3,
        movieId: 3,
        date: "2025-10-26",
        time: "20:00",
        location: "Fuerte de Samaipata",
        availableSeats: 60,
        price: 120.00
    },
    {
        id: 4,
        movieId: 5,
        date: "2025-10-27",
        time: "20:30",
        location: "Quinta Curucusi",
        availableSeats: 50,
        price: 85.00
    },
    {
        id: 5,
        movieId: 4,
        date: "2025-10-28",
        time: "21:30",
        location: "Urubó Village",
        availableSeats: 40,
        price: 140.00
    },
    {
        id: 6,
        movieId: 6,
        date: "2025-10-29",
        time: "20:00",
        location: "Jardín Botánico",
        availableSeats: 35,
        price: 100.00
    },
    {
        id: 7,
        movieId: 1,
        date: "2025-10-30",
        time: "21:00",
        location: "Fuerte de Samaipata",
        availableSeats: 55,
        price: 120.00
    },
    {
        id: 8,
        movieId: 3,
        date: "2025-10-31",
        time: "20:30",
        location: "Quinta Curucusi",
        availableSeats: 48,
        price: 85.00
    },
    {
        id: 10,
        movieId: 7,
        date: "2025-11-01",
        time: "20:30",
        location: "Fuerte de Samaipata",
        availableSeats: 48,
        price: 85.00
    },
    {
        id: 11,
        movieId: 8,
        date: "2025-11-02",
        time: "20:30",
        location: "Urubó Village",
        availableSeats: 48,
        price: 95.00
    },
    {
        id: 12,
        movieId: 3,
        date: "2025-11-03",
        time: "20:30",
        location: "Jardín Botánico",
        availableSeats: 48,
        price: 80.00
    },
    {
        id: 12,
        movieId: 1,
        date: "2025-11-04",
        time: "20:30",
        location: "Jardín Botánico",
        availableSeats: 48,
        price: 95.00
    },
    {
        id: 12,
        movieId: 2,
        date: "2025-11-05",
        time: "20:30",
        location: "Jardín Botánico",
        availableSeats: 48,
        price: 75.00
    },
    {
        id: 12,
        movieId: 5,
        date: "2025-11-06",
        time: "20:30",
        location: "Jardín Botánico",
        availableSeats: 48,
        price: 70.00
    }

    
];

// Datos de ubicaciones
const locations = [
    {
        id: 1,
        name: "Urubó Village",
        address: "Cerca del nuevo puente al Urubó",
        capacity: 150,
        description: "Nuestro espacio más emblemático de la ciudad. Rodeado de árboles centenarios y con una vista espectacular del cielo nocturno.",
        image: "/public/images/Urubó.png",
        amenities: ["Estacionamiento gratuito", "Cafetería", "Baños", "Área de picnic", "Sillas y mantas"]
    },
    {
        id: 2,
        name: "Jardín Botánico",
        address: "Calle de las Flores 456",
        capacity: 100,
        description: "Un oasis natural perfecto para disfrutar del cine bajo las estrellas, rodeado de flora exótica y el aroma de las flores nocturnas.",
        image: "/public/images/jardin-botanico.jpg",
        amenities: ["Jardines temáticos", "Cafetería gourmet", "Baños ecológicos", "Tours nocturnos", "Mantas premium"]
    },
    {
        id: 3,
        name: "Quinta Curucusi",
        address: "Torre Panorama, Piso 12",
        capacity: 80,
        description: "Una experiencia cinematográfica exclusiva en las alturas. Disfruta de películas con una vista panorámica de 360° de la ciudad iluminada.",
        image: "/public/images/quinta.jpg",
        amenities: ["Bar premium", "Lounge VIP", "Servicio de catering", "Calefactores", "Asientos reclinables"]
    },
    {
        id: 4,
        name: "Fuerte de Samaipata",
        address: "Colina del Observatorio s/n",
        capacity: 120,
        description: "El lugar perfecto para los amantes de la astronomía y el cine. Antes de cada función, telescopios disponibles para observar las estrellas.",
        image: "/public/images/Elfuerte.jpg",
        amenities: ["Telescopios", "Guía astronómico", "Zona de camping", "Fogatas permitidas", "Snack bar"]
    }
];