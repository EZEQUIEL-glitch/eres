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


// Escuchar click en cada canción

function crearParticulas() {
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particula';

        const x = (Math.random() - 0.5) * 120 + 'px';
        const y = (Math.random() - 0.5) * 120 + 'px';

        p.style.setProperty('--x', x);
        p.style.setProperty('--y', y);

        p.style.left = '50%';
        p.style.top = '50%';

        fraseDisplay.appendChild(p);

        setTimeout(() => p.remove(), 600);
    }
}
setInterval(() => {
    const heart = document.createElement('img');
    heart.src = 'canciones/pixel-heart.png'; // 👈 cambia esto
    heart.className = 'pixel-heart';

    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';

    heart.style.animationDuration = (4 + Math.random() * 3) + 's';

    document.getElementById('corazones').appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
}, 500);
document.querySelectorAll('.cancion audio').forEach(audio => {
    const card = audio.closest('.cancion');

    audio.addEventListener('play', () => {
        document.querySelectorAll('.cancion').forEach(c =>
            c.classList.remove('activa')
        );
        card.classList.add('activa');
    });

    audio.addEventListener('pause', () => {
        card.classList.remove('activa');
    });

    audio.addEventListener('ended', () => {
        card.classList.remove('activa');
    });
});
corazones.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;

    corazones.style.backgroundPosition = `${50 - x}% ${50 - y}%`;
});
document.querySelectorAll('.cancion').forEach(card => {

    const audio = card.querySelector('audio');
    const playBtn = card.querySelector('.play-btn');
    const progress = card.querySelector('.progress');
    const time = card.querySelector('.time');

    playBtn.addEventListener('click', () => {

        // Pausar otros audios
        document.querySelectorAll('.cancion audio').forEach(a => {
            if (a !== audio) a.pause();
        });

        if (audio.paused) {
            audio.play();
            playBtn.textContent = '❚❚';
        } else {
            audio.pause();
            playBtn.textContent = '▶';
        }
    });

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + '%';

        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60)
            .toString()
            .padStart(2, '0');

        time.textContent = `${minutes}:${seconds}`;
    });

    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶';
    });

});