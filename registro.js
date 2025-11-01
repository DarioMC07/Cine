// Handle form submission
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        fechaNacimiento: formData.get('fechaNacimiento'),
        newsletter: formData.get('newsletter') === 'on',
        promociones: formData.get('promociones') === 'on'
    };

    // Validate required fields
    if (!data.nombre || !data.apellido || !data.email) {
        alert('Por favor completa los campos requeridos');
        return;
    }

    // Store data (in real app, this would be sent to a server)
    console.log('Datos de registro:', data);
    localStorage.setItem('registeredUser', JSON.stringify(data));

    // Show success view
    document.getElementById('user-name').textContent = data.nombre;
    document.getElementById('form-view').style.display = 'none';
    document.getElementById('success-view').style.display = 'block';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reset form function
function resetForm() {
    document.getElementById('register-form').reset();
    document.getElementById('form-view').style.display = 'block';
    document.getElementById('success-view').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Check if user is already registered
const registeredUser = localStorage.getItem('registeredUser');
if (registeredUser && window.location.search.includes('success')) {
    const user = JSON.parse(registeredUser);
    document.getElementById('user-name').textContent = user.nombre;
    document.getElementById('form-view').style.display = 'none';
    document.getElementById('success-view').style.display = 'block';
}