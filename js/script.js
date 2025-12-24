// ============================== NAVBAR ==============================
// const navbar = document.getElementsByTagName('nav')[0];
// const logo = document.getElementById('logo-sida');

// window.addEventListener('scroll', function(){
//     if(window.scrollY > 1){
//         console.log(this.window.scrollY);
//         navbar.classList.replace('bg-transparent', 'nav-color');
//         navbar.classList.remove('navbar-dark');
//         logo.src = 'assets/logo/logo-color.svg';
//     } else if(this.window.scrollY <= 0){
//         navbar.classList.replace('nav-color', 'bg-transparent');
//         navbar.classList.add('navbar-dark');
//         logo.src = 'assets/logo/logo-white.svg';
//     }
// });

// function offcanvasAdaptation() {
//     if (window.innerWidth > 991) {
        
//     }
// }

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