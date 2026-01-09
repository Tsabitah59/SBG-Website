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
let currentIndex = 0; // Mulai dari sub-bisnis pertama (index 0)
let data; // Untuk menyimpan data JSON
let buttons = []; // Array untuk menyimpan referensi tombol

// JSON Load
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Gagal memuat file JSON');
        }
        data = await response.json();
        createButtons(); // Buat tombol untuk setiap sub-bisnis
        renderSubBusiness(currentIndex); // Render yang pertama dulu
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('content').innerHTML = '<p>Gagal memuat data. Pastikan file JSON ada dan server lokal berjalan.</p>';
    }
}

// Button Grup Bisnis
function createButtons() {
    const subBisinsButton = document.getElementById('switch-button-grup-bisnis');
    data.subBusinesses.forEach((sub, index) => {
        // Button
        const button = document.createElement('button');
        button.classList.add('card-layout', 'd-sm-flex', 'd-block');
        
        // span for tag
        const span = document.createElement('span');
        span.classList.add('primary-tag');
        span.textContent = sub.tag;
        
        // h6 for sub business title
        const h6 = document.createElement('h6');
        h6.classList.add('heading-6', 'mb-0', 'mt-sm-0', 'mt-2');
        h6.textContent = sub.name;
        
        // Tambahkan span dan h6 ke dalam button
        button.appendChild(span);
        button.appendChild(h6);
        
        button.addEventListener('click', () => {
            currentIndex = index;
            renderSubBusiness(currentIndex);
            updateActiveButton(index);
        });
        
        // Tambahkan button ke container
        subBisinsButton.appendChild(button);
        buttons.push(button); // Simpan referensi tombol
    });
}

// Sub Bisnis Content
function renderSubBusiness(index) {
    const sub = data.subBusinesses[index];
    var subBisnisTitle = document.getElementById('sub-bisnis-title');
    var subBisnisDescription = document.getElementById('sub-bisnis-desc');

    subBisnisTitle.innerHTML = sub.name;
    subBisnisDescription.innerHTML = sub.description;
}

// Style Update Button
function updateActiveButton(activeIndex) {
    buttons.forEach((btn, index) => {
        if (index === activeIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

window.onload = loadData;
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