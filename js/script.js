// ============================== Navbar ==============================
const navbar = document.getElementsByTagName('nav')[0];
const logo = document.getElementById('logo-sida');

window.addEventListener('scroll', function(){
console.log(logo.src);
    if(window.scrollY > 1){
        navbar.classList.replace('bg-transparent', 'nav-color');
        navbar.classList.remove('navbar-dark');
        logo.src = 'assets/logo/logo-color.svg';
    } else if(this.window.scrollY <= 0){
        navbar.classList.replace('nav-color', 'bg-transparent');
        navbar.classList.add('navbar-dark');
        logo.src = 'assets/logo/logo-white.svg';
    }
})

// ============================== Grup Bisnis ==============================
// Mendapatkan elemen
const grupBisnisTitle = document.getElementById('grup-bisnis-title');
const grupBisnisDeskripsi = document.getElementById('grup-bisnis-deskripsi');
const grupBisnisLink = document.getElementById('grup-bisnis-link');

// MODIFIKASI: Gunakan cubic-bezier untuk easing custom yang lebih smooth
grupBisnisTitle.style.transition = "500ms ease";
grupBisnisDeskripsi.style.transition = "500ms ease";

// Mengganti Judul
let sbkTitle = "SIDA BERJAYA KONSULTAN";
let sbeTitle = "SIDA BERJAYA ENERGI";
let sjkTitle = "SIDA JAYA KONSTRUKSI";

// Mengganti Deskirpsi
let sbkDeskripsi = "Menyediakan layanan konsultasi ahli dalam fasilitasi impor dan kepabeanan, membantu klien memperlancar operasional, memastikan kepatuhan, serta meminimalkan resiko bisnis.";
let sbeDeskripsi = "Mendorong transisi menuju energi berkelanjutan melalui solusi energi terbarukan, infrastruktur pengisian kendaraan listrik, serta SIDAsafe, layanan transportasi online dengan kendaraan listrik khusus perempuan.";
let sjkDeskripsi = "Menyediakan solusi konstruksi menyeluruh , mulai dari pengembangan lahan, layanan desain & bangun, hingga pengembangan SIDA Tower sebagai ikon gedung perkantoran dan bisnis masa depan.";

// Mengganti Link
// let sbkLink = "google.com"

function sbkChange() {
    grupBisnisTitle.style.opacity = 0;
    grupBisnisDeskripsi.style.opacity = 0;

    setTimeout(() => {
        grupBisnisTitle.innerHTML = sbkTitle;
        grupBisnisDeskripsi.innerHTML = sbkDeskripsi;
    
        grupBisnisTitle.style.opacity = 1;
        grupBisnisDeskripsi.style.opacity = 1;
    }, 500);
}

function sbeChange() {
    grupBisnisTitle.style.opacity = 0;
    grupBisnisDeskripsi.style.opacity = 0;

    setTimeout(() => {
        grupBisnisTitle.innerHTML = sbeTitle;
        grupBisnisDeskripsi.innerHTML = sbeDeskripsi;
    
        grupBisnisTitle.style.opacity = 1;
        grupBisnisDeskripsi.style.opacity = 1;
    }, 500);
}

function sjkChange() {
    grupBisnisTitle.style.opacity = 0;
    grupBisnisDeskripsi.style.opacity = 0;
    setTimeout(() => {
        grupBisnisTitle.innerHTML = sjkTitle;
        grupBisnisDeskripsi.innerHTML = sjkDeskripsi;

        grupBisnisTitle.style.opacity = 1;
        grupBisnisDeskripsi.style.opacity = 1;
    }, 500);
}

// ============================== Portfolio Carousel ==============================
const portfolioWrapper = document.querySelector(".portfolio-wrapper");
const portfolioCarousel = document.querySelector(".portfolio-carousel");
const arrowBtns = document.querySelectorAll(".portfolio-wrapper i");
const firstCardWidth = portfolioCarousel.querySelector(".portfolio-card").offsetWidth;
const portfolioCarouselChildern = [...portfolioCarousel.children];

let isDragging = false,startX, startScrollLeft, timeoutId;

// Mendapat card di carousel tersebut
let cardPerView = Math.round(portfolioCarousel.offsetWidth / firstCardWidth);

// Copy dari card terakhir
portfolioCarouselChildern.slice(-cardPerView).reverse().forEach(card => {
    portfolioCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Copy dari card pertama
portfolioCarouselChildern.slice(0, cardPerView).reverse().forEach(card => {
    portfolioCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Membuat button menggerakan slider ke kiri dan kanan
arrowBtns.forEach(btn => {
    btn.addEventListener("click", ()=> {
        portfolioCarousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    portfolioCarousel.classList.add("dragging");

    // Initial cursor and scroll position
    startX = e.pageX;
    startScrollLeft = portfolioCarousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // kalo isDragging jadi true maka bisa di-scroll

    // Update scroll position berdasarkan pergerakan cursor
    portfolioCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    portfolioCarousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return; // jalankan kalau ukuran kurang dari 800
    timeoutId = setTimeout(() => {
        portfolioCarousel.scrollLeft += firstCardWidth;
        autoPlay();
    }, 2500); // autoplay setiap 2.5 detik
}
autoPlay();

const infiniteScroll = () => {
    // Scroll ke akhir pas ada di awal
    if (portfolioCarousel.scrollLeft <= 0) {
        portfolioCarousel.classList.add("no-transition");
        portfolioCarousel.scrollLeft = portfolioCarousel.scrollWidth - (2 * portfolioCarousel.offsetWidth);
        portfolioCarousel.classList.remove("no-transition");
        
        // Scroll ke awal pas ada di akhir
    } else if (portfolioCarousel.scrollLeft + portfolioCarousel.offsetWidth >= portfolioCarousel.scrollWidth - portfolioCarousel.offsetWidth) {
        portfolioCarousel.classList.add("no-transition");
        portfolioCarousel.scrollLeft = portfolioCarousel.offsetWidth;
        portfolioCarousel.classList.remove("no-transition");
    }

    // Autoplay kalo nggak di hover
    clearTimeout(timeoutId);
    if (!portfolioWrapper.matches(":hover")) autoPlay();
}

portfolioCarousel.addEventListener("mousedown", dragStart);
portfolioCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
portfolioCarousel.addEventListener("scroll", infiniteScroll);
portfolioWrapper.addEventListener("mouseenter", infiniteScroll => clearTimeout(timeoutId));
portfolioCarousel.addEventListener("mouseleave", autoPlay);