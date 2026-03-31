// ============================== NAVBAR ==============================
const navbar = document.getElementsByTagName('nav')[0];
const logo = document.getElementById('logo-sida');
const backdrop = document.querySelector('.navbar-backdrop');
const footer = document.get;

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 1;
    
    navbar.classList.toggle('nav-color', scrolled);
    navbar.classList.toggle('bg-transparent', !scrolled);
    
    backdrop.classList.toggle('active', scrolled);
    
    logo.src = scrolled ? 'assets/logo/logo-color.svg' : 'assets/logo/logo-white.svg';
});



// ============================== GRUP BISNIS ==============================
let currentIndex = 0; // Sub bisnis pertama
let data; // Data JSON
let buttons = []; // Array untuk tombol

// JSON Load
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Gagal memuat file JSON');
        }
        data = await response.json();
        createButtons(); // Tombol tab controller Sub Bisnis
        renderSubBusiness(currentIndex); // Render yang pertama
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('content').innerHTML = '<p>Gagal memuat data. Pastikan file JSON ada dan server lokal berjalan.</p>';
    }
}

function createButtons() {
    const subBisinsButton = document.getElementById('switch-button-grup-bisnis');

    data.subBusinesses.forEach((sub, index) => {
        const button = document.createElement('button');
        button.classList.add('card-layout', 'd-sm-flex', 'd-block');
        
        const span = document.createElement('span');
        span.classList.add('primary-tag');
        span.textContent = sub.tag;
        
        const h6 = document.createElement('h6');
        h6.classList.add('heading-6', 'mb-0', 'mt-sm-0', 'mt-2');
        h6.textContent = sub.name;
        
        button.appendChild(span);
        button.appendChild(h6);
        
        button.addEventListener('click', () => {
            if (currentIndex === index) return;
            
            currentIndex = index;
            renderSubBusiness(currentIndex);
            updateActiveButton(index);
        });
        
        subBisinsButton.appendChild(button);
        buttons.push(button);
    });

    // aktifkan button pertama saat load
    updateActiveButton(currentIndex);
}

// Grup Bisnis Content
function renderSubBusiness(index) {
    const sub = data.subBusinesses[index];

    // Title & Description
    var subBisnisTitle = document.getElementById('sub-bisnis-title');
    var subBisnisDescription = document.getElementById('sub-bisnis-desc');

    // reset animasi
    subBisnisTitle.classList.remove("anim-title");
    subBisnisDescription.classList.remove("anim-desc");
    void subBisnisTitle.offsetWidth; // force reflow supaya animasi bisa diputar lagi

    subBisnisTitle.innerHTML = sub.name;
    subBisnisDescription.innerHTML = sub.description;

    // trigger animasi
    subBisnisTitle.classList.add("anim-title");
    subBisnisDescription.classList.add("anim-desc");
    
    // Content Image
    const judulSectionGrupBisnis = document.querySelector('.judul-section-grup-bisnis');
    judulSectionGrupBisnis.classList.add('fade-out');

    judulSectionGrupBisnis.addEventListener('transitionend', function handler() {

        if (sub.imageUrl) {
            judulSectionGrupBisnis.style.setProperty('--bg-image', `url(${sub.imageUrl})`);
        }

        judulSectionGrupBisnis.classList.remove('fade-out');

        judulSectionGrupBisnis.removeEventListener('transitionend', handler);
    });
    
    // Fokus Bisnis
    var focusBusiness = sub.focusBusiness; 
    var subFocusBisnis = sub.subFocusBisnis; 
    var wrapListFokusBisnisGrupBisnis = document.getElementById('fokus-bisnis-grup-bisnis');
    wrapListFokusBisnisGrupBisnis.innerHTML = '';
        
    focusBusiness.forEach((focusBisnisData, index) => {
        const listForGrupBisnisData = document.createElement('li');
        listForGrupBisnisData.className = 'd-flex gap-3 align-items-center mb-3';
        
        const tagFokusBisnisGrupBisnis = document.createElement('span');
        tagFokusBisnisGrupBisnis.className = 'primary-tag';
        tagFokusBisnisGrupBisnis.textContent = index + 1; 
        
        const wrapperListPenjelasannya = document.createElement('div');
        wrapperListPenjelasannya.className = 'list-penjelasan-fokus-bisnis-grup-bisnis';
        
        const dataPenjelasanKeunggulanGrupBisnisJudul = document.createElement('p');
        dataPenjelasanKeunggulanGrupBisnisJudul.className = 'body-p mb-0';
        dataPenjelasanKeunggulanGrupBisnisJudul.textContent = focusBisnisData;
        
        wrapperListPenjelasannya.appendChild(dataPenjelasanKeunggulanGrupBisnisJudul);
        
        if (Array.isArray(subFocusBisnis) && subFocusBisnis[index]) {
            const dataPenjelasanKeunggulanGrupBisnisIsi = document.createElement('p');
            dataPenjelasanKeunggulanGrupBisnisIsi.className = 'body-p text-color-secondary';
            dataPenjelasanKeunggulanGrupBisnisIsi.textContent = subFocusBisnis[index];
            
            wrapperListPenjelasannya.appendChild(dataPenjelasanKeunggulanGrupBisnisIsi);
            
            // Styling posisi tagnya
            listForGrupBisnisData.className = 'd-flex gap-2 align-items-start mb-3';
            tagFokusBisnisGrupBisnis.className = 'primary-tag mt-2';
        }
        
        listForGrupBisnisData.appendChild(tagFokusBisnisGrupBisnis);
        listForGrupBisnisData.appendChild(wrapperListPenjelasannya);
                
        wrapListFokusBisnisGrupBisnis.appendChild(listForGrupBisnisData);
    });

    // Keunggulan
    var keyAdvantages = sub.keyAdvantages;
    var wrapListKeunggulanGrupBisnis = document.getElementById('keunggulan-grup-bisnis');
    wrapListKeunggulanGrupBisnis.innerHTML = '';

    wrapListKeunggulanGrupBisnis.classList.add('fade-out');


    // Loop melalui array keyAdvantages
    setTimeout(() => {
        keyAdvantages.forEach((item, index) => {
            const listForGrupBisnisData = document.createElement('li');
            listForGrupBisnisData.className = 'd-flex gap-3 align-items-center mb-3';
                
            const tagKeunggulanGrupBisnis = document.createElement('span');
            tagKeunggulanGrupBisnis.className = 'primary-tag';
            tagKeunggulanGrupBisnis.textContent = index + 1; 
                
            const dataPenjelasanKeunggulanGrupBisnis = document.createElement('p');
            dataPenjelasanKeunggulanGrupBisnis.className = 'body-p mb-0';
            dataPenjelasanKeunggulanGrupBisnis.textContent = item;
                
            listForGrupBisnisData.appendChild(tagKeunggulanGrupBisnis);
            listForGrupBisnisData.appendChild(dataPenjelasanKeunggulanGrupBisnis);
                
            wrapListKeunggulanGrupBisnis.appendChild(listForGrupBisnisData);
        });
        wrapListKeunggulanGrupBisnis.classList.remove('fade-out');
    }, 300);
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
const section = document.querySelector('.keunggulan');
const container = document.querySelector('.cards-container');

window.addEventListener('scroll', () => {
  const sectionTop = section.offsetTop;
  const scrollY = window.scrollY;
  
  const sectionHeight = section.offsetHeight;
  const windowHeight = window.innerHeight;

  const scrollProgress = (scrollY - sectionTop) / (sectionHeight - windowHeight);

  const maxTranslate = container.scrollWidth - window.innerWidth;

  console.log(container.scrollWidth);
  
  
  if (scrollProgress >= 0 && scrollProgress <= 1) {
    container.style.transform = `translateX(-${scrollProgress * (maxTranslate + 100)}px)`;
  }
});

// Panggil fungsi saat halaman dimuat dan saat window di-resize
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);