// URL de tu Apps Script (reemplaza con la tuya)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz5S1IWC5ugMP08x4RSnBvsLGtJQwVVSVIItfHrPpnZ_iJxfvY_LlAFi66Qoz3WN6GXaw/exec';

// Handle form submission
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
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

    // Mostrar indicador de carga
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
        // Enviar datos a Google Sheets
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Importante para Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Como usamos no-cors, no podemos leer la respuesta, 
        // pero si llega aquí, asumimos que fue exitoso
        console.log('Datos enviados:', data);

        // Show success view
        document.getElementById('user-name').textContent = data.nombre;
        document.getElementById('form-view').style.display = 'none';
        document.getElementById('success-view').style.display = 'block';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error('Error al enviar:', error);
        alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
        
        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Reset form function
function resetForm() {
    document.getElementById('register-form').reset();
    document.getElementById('form-view').style.display = 'block';
    document.getElementById('success-view').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}