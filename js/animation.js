// Deteksi ukuran layar
function setAosAnimation() {
  const elements = document.querySelectorAll('.animasi-text');
  
  if (window.innerWidth < 768) {
    // Untuk HP (di bawah 768px) → fade-down
    elements.forEach(el => el.setAttribute('data-aos', 'fade-down'));
  } else {
    // Untuk Desktop → fade-up
    elements.forEach(el => el.setAttribute('data-aos', 'fade-up'));
  }
}

// Jalankan saat halaman dimuat
setAosAnimation();

// Jalankan saat ukuran layar berubah
window.addEventListener('resize', setAosAnimation);

// Inisialisasi AOS
AOS.init();