// ============================== NAVBAR ==============================
const navbar = document.getElementsByTagName('nav')[0];
const logo = document.getElementById('logo-sida');
const backdrop = document.querySelector('.navbar-backdrop');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 1;

    navbar.classList.toggle('nav-color', scrolled);
    navbar.classList.toggle('bg-transparent', !scrolled);

    backdrop.classList.toggle('active', scrolled);

    logo.src = scrolled ? 'assets/logo/logo-color.svg' : 'assets/logo/logo-white.svg';
});

// ============================== GRUP BISNIS ==============================

// ============================== KEUNGGULAN ==============================
let children = [];

function removeParent() {
    const parent = document.getElementById('keunggulan-card-group-to-hide');
    const container = document.getElementById('keunggulan-wrapper');

    if (parent && container) {
        while (parent.firstChild) {
            children.push(parent.firstChild);
            container.insertBefore(parent.firstChild, parent);
        }
        
        parent.remove();
    }
}

function addParent() {
    const container = document.getElementById('keunggulan-wrapper');
    
    if (container && children.length > 0) {
        const parent = document.createElement('div');
        parent.id = 'keunggulan-card-group-to-hide';
        parent.className = 'keunggulan-card-group overflow-auto'
        
        container.appendChild(parent);
        
        children.forEach(child => {
            parent.appendChild(child);
        });
        
        children = [];
    }
}

function checkScreenSize() {
    const parentExists = document.getElementById('keunggulan-card-group-to-hide');
    
    if (window.innerWidth > 575) {
        if (parentExists) {
            removeParent();
        }
    } else {
        if (!parentExists) {
            addParent();
        }
    }
}

// Panggil fungsi saat halaman dimuat dan saat window di-resize
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);