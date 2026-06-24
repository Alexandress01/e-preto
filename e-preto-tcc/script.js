/* ===== SCRIPT PRINCIPAL DO SITE "É PRETO" ===== */

// Seleção de elementos do DOM
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-links a');

// ===== FUNCIONALIDADES DO MENU HAMBÚRGUER =====
// Abre/fecha o menu móvel ao clicar no hambúrguer
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fecha o menu ao clicar em um link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (event) => {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===== SCROLL SUAVE E EFEITOS =====
// Detecta scroll para efeitos na navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===== ANIMAÇÃO AO ENTRAR NO VIEWPORT =====
// Observa elementos para animar quando entram na tela
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Anima os cards ao entrar no viewport
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== FUNCIONALIDADE BOTÃO "EXPLORAR" =====
// Scroll suave para a seção de cards
const btnExplorar = document.querySelector('.btn-primary');
if (btnExplorar) {
    btnExplorar.addEventListener('click', (e) => {
        e.preventDefault();
        const section = document.getElementById('explorar');
        section.scrollIntoView({ behavior: 'smooth' });
    });
}

// ===== INDICADOR DE SEÇÃO ATIVA =====
// Destaca o link ativo na navbar baseado no scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.style.color = '#333';
        
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#d4af37';
        }
    });
});

// ===== EFEITO HOVER NOS CARDS =====
// Adiciona efeitos interativos aos cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== FUNCIONALIDADES ADICIONAIS =====
// Log de inicialização (remover em produção se desejar)
console.log('Site "É Preto" carregado com sucesso! 🎓');

// Função para adicionar novo conteúdo dinamicamente (template para expansão futura)
function addContentToSection(sectionId, content) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.innerHTML += content;
    }
}

// Função para atualizar cores do tema (template para personalização)
function updateThemeColor(colorName, colorValue) {
    document.documentElement.style.setProperty(`--${colorName}`, colorValue);
}

// ===== LAZY LOADING PARA IMAGENS (FUTURO) =====
// Template para lazy loading de imagens quando implementar mais conteúdo
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== FUNÇÃO DE BUSCA (TEMPLATE PARA FUTURO) =====
// Template para implementar busca no site quando adicionar mais conteúdo
function searchContent(query) {
    console.log(`Buscando por: ${query}`);
    // Implementar lógica de busca aqui
}

// ===== EVENT LISTENERS EXTRAS =====
// Trata cliques em links de card para futuras funcionalidades
document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Aqui você pode adicionar lógica customizada para cada card
        console.log(`Clicou no link: ${this.innerText}`);
    });
});

// ===== PERFORMANCE: Carrega conteúdo progressivamente =====
// Garante que o site carregue rapidamente
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado');
    
    // Adicione aqui qualquer lógica que precise do DOM pronto
});
