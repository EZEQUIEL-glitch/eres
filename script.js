// ELEMENTOS
const btnInicio = document.getElementById('btnInicio');
const inicio = document.getElementById('inicio');
const carta = document.getElementById('carta');
const btnSiguiente = document.getElementById('btnSiguiente');
const corazones = document.getElementById('corazones');

// AL HACER CLICK EN INICIO
btnInicio.addEventListener('click', () => {
    inicio.style.display = 'none';
    carta.style.display = 'flex';
});

// AL HACER CLICK EN SIGUIENTE
btnSiguiente.addEventListener('click', () => {
    carta.style.display = 'none';
    corazones.style.display = 'block';
});

const canciones = document.querySelectorAll('.cancion');
const fraseDisplay = document.getElementById('fraseCancion');

// Función máquina de escribir
function maquinaDeEscribir(elemento, texto, velocidad = 50) {
    let i = 0;
    elemento.textContent = '';

    // Limpiamos texto: quitamos saltos de línea y espacios extra
    texto = texto.replace(/\s+/g, ' ').trim();

    const interval = setInterval(() => {
        elemento.textContent += texto.charAt(i);
        i++;
        if (i >= texto.length) clearInterval(interval);
    }, velocidad);
}

// Escuchar click en cada canción
canciones.forEach(c => {
    const audio = c.querySelector('audio');
    const frase = c.dataset.frase;

    c.addEventListener('click', () => {
        // Pausar todas las demás canciones
        canciones.forEach(other => {
            const a = other.querySelector('audio');
            if (a !== audio) a.pause();
        });

        // Reproducir la canción seleccionada
        audio.play();

        // Mostrar frase con efecto máquina de escribir
        maquinaDeEscribir(fraseDisplay, frase, 50);
    });
});
