/* ===== SCRIPT DA GALERIA CARROSSEL ===== */

// Seleção de elementos
const galeríaTrack = document.getElementById('galeríaTrack');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const galeríaItems = document.querySelectorAll('.galeria-item');
const obraAtual = document.getElementById('obraAtual');
const totalObras = document.getElementById('totalObras');
const galeríaDots = document.getElementById('galeríaDots');

// Estado
let currentIndex = 0;
const totalItems = galeríaItems.length;
let isDragging = false;
let startX = 0;
let currentX = 0;

// Atualiza o total de obras
totalObras.textContent = totalItems;

// ===== CRIAR DOTS DE NAVEGAÇÃO =====
function createDots() {
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateGaleria();
        });
        
        galeríaDots.appendChild(dot);
    }
}

// ===== ATUALIZAR GALERIA =====
function updateGaleria() {
    // Calcular a posição
    const offset = -currentIndex * 100;
    galeríaTrack.style.transform = `translateX(${offset}%)`;
    
    // Atualizar número da obra
    obraAtual.textContent = currentIndex + 1;
    
    // Atualizar dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });
}

// ===== NAVEGAÇÃO ANTERIOR =====
btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateGaleria();
});

// ===== NAVEGAÇÃO PRÓXIMA =====
btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateGaleria();
});

// ===== NAVEGAÇÃO POR TECLADO =====
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        btnPrev.click();
    } else if (event.key === 'ArrowRight') {
        btnNext.click();
    }
});

// ===== SUPORTE A TOQUE/SWIPE =====
// Detecta movimento de arrasto na galeria
galeríaTrack.addEventListener('mousedown', startDrag);
galeríaTrack.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', moveDrag);
document.addEventListener('touchmove', moveDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    currentX = startX;
    galeríaTrack.style.cursor = 'grabbing';
}

function moveDrag(e) {
    if (!isDragging) return;
    
    currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
}

function endDrag(e) {
    if (!isDragging) return;
    
    isDragging = false;
    galeríaTrack.style.cursor = 'grab';
    
    const diff = startX - currentX;
    const threshold = 50; // Distância mínima para registrar swipe
    
    if (diff > threshold) {
        // Swipe para esquerda - próxima imagem
        btnNext.click();
    } else if (diff < -threshold) {
        // Swipe para direita - imagem anterior
        btnPrev.click();
    }
}

// ===== INICIALIZAÇÃO =====
createDots();
updateGaleria();

console.log('Galeria carregada com sucesso! ✨');

/* ===== MODAL DE VISUALIZAÇÃO DE OBRA ===== */
const obraImages = document.querySelectorAll('.obra-placeholder img');
const modalOverlay = document.getElementById('obraModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');

function openModal(src, title, desc, alt) {
    modalImage.src = src;
    modalImage.alt = alt || title || 'Imagem da obra';
    modalTitle.textContent = title || '';
    modalDesc.textContent = desc || '';
    modalOverlay.classList.add('show');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('show');
    modalOverlay.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    modalTitle.textContent = '';
    modalDesc.textContent = '';
    document.body.style.overflow = '';
}

obraImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        const src = img.getAttribute('src');
        const title = img.dataset.title || img.alt || '';
        const desc = img.dataset.description || '';
        openModal(src, title, desc, img.alt);
    });
});

modalClose.addEventListener('click', closeModal);

// Fecha ao clicar fora do conteúdo
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// ESC para fechar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
        closeModal();
    }
});
