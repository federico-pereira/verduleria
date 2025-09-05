// Reproduce/pausa el video al entrar/salir el puntero del bloque .hero-inner
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.hero-inner');

  blocks.forEach(block => {
    const video = block.querySelector('.hover-video video');
    if (!video) return;

    const play = () => {
      try {
        video.currentTime = 0;
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch (_) {}
    };

    const stop = () => {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (_) {}
    };

    // Mouse/puntero
    block.addEventListener('mouseenter', play);
    block.addEventListener('mouseleave', stop);

    // Accesibilidad (teclado) y soporte táctil básico
    block.addEventListener('focusin', play);
    block.addEventListener('focusout', stop);
    block.addEventListener('touchstart', play, { passive: true });
    block.addEventListener('touchend', stop);
  });
});
