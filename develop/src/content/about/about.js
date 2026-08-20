// JavaScript para página Sobre - Versão Container
// Otimizado para funcionar dentro do elemento object

document.addEventListener('DOMContentLoaded', function() {
    
    // Função para voltar aos produtos (navegar no container pai)
    window.loadProducts = function() {
        // Tentar acessar o objeto parent
        try {
            if (window.parent && window.parent.document) {
                const productObject = window.parent.document.getElementById('productObject');
                if (productObject) {
                    productObject.data = 'src/content/products/products.html';
                }
            }
        } catch (e) {
            // Fallback: recarregar a página principal
            window.location.href = '/index.html';
        }
    };

    // Lazy loading para imagens (adaptado para container)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                    }
                    observer.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }

    // Animações de entrada para seções (adaptadas)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar seções principais
    const sections = document.querySelectorAll('.story-section, .mission-section, .products-overview, .location-section');
    sections.forEach(section => {
        section.classList.add('animate-ready');
        sectionObserver.observe(section);
    });

    // Smooth scroll para links internos (limitado ao container)
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Feedback visual para cliques em botões
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-back');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efeito visual de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Otimização para dispositivos touch
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Melhorar experiência touch
        const hoverElements = document.querySelectorAll('.mission-card, .specialty-item, .contact-item');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 100);
            });
        });
    }

    // Analytics simplificado (compatível com container)
    const trackEngagement = () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        // Tentar acessar Clarity do parent
        try {
            const parentClarity = window.parent && window.parent.clarity;
            if (parentClarity) {
                if (scrollPercent >= 25 && !window.tracked25) {
                    window.tracked25 = true;
                    parentClarity('event', 'about_scroll_25_percent');
                }
                
                if (scrollPercent >= 50 && !window.tracked50) {
                    window.tracked50 = true;
                    parentClarity('event', 'about_scroll_50_percent');
                }
            }
        } catch (e) {
            // Silenciar erros de cross-frame
        }
    };

    // Throttle para scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(trackEngagement, 100);
    });

    // Track cliques em CTAs
    const ctaButtons = document.querySelectorAll('.cta-buttons a');
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            try {
                const parentClarity = window.parent && window.parent.clarity;
                if (parentClarity) {
                    parentClarity('event', 'about_cta_click', { 
                        button: index === 0 ? 'whatsapp' : 'instagram',
                        page: 'about_container'
                    });
                }
            } catch (e) {
                // Silenciar erros de cross-frame
            }
        });
    });

    // Otimização de performance para container
    const optimizePerformance = () => {
        // Remover animações em dispositivos com pouca performance
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.style.setProperty('--transition-smooth', 'none');
            document.body.style.setProperty('--transition-gentle', 'none');
        }
        
        // Pausar animações quando não estiver visível
        document.addEventListener('visibilitychange', () => {
            const floatingElements = document.querySelector('.floating-elements');
            if (floatingElements) {
                if (document.hidden) {
                    floatingElements.style.animationPlayState = 'paused';
                } else {
                    floatingElements.style.animationPlayState = 'running';
                }
            }
        });
    };

    optimizePerformance();

    // Fallback para navegadores sem suporte a IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        // Adicionar classe animate-in a todas as seções
        sections.forEach(section => {
            section.classList.add('animate-in');
        });
        
        // Carregar todas as imagens imediatamente
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('loading');
        });
    }

    // Notificar o parent que a página carregou
    try {
        if (window.parent && window.parent.postMessage) {
            window.parent.postMessage({
                type: 'about_page_loaded',
                timestamp: Date.now()
            }, '*');
        }
    } catch (e) {
        // Silenciar erros de cross-frame
    }

    console.log('📖 Página Sobre carregada no container!');
});
