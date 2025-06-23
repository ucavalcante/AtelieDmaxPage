"use strict";
class MainNavigationController {
    constructor() {
        this.productObject = null;
        this.vueApp = null;
        this.init();
    }
    init() {
        this.productObject = document.getElementById('productObject');
        this.setupEventListeners();
        this.setupGlobalFunctions();
        this.initializeVueApp();
    }
    loadAboutPage(options = {}) {
        if (!this.productObject) {
            console.error('❌ Elemento productObject não encontrado');
            return;
        }
        this.productObject.data = 'src/content/about/about.html';
        if (options.analytics !== false && window.clarity) {
            window.clarity.event('navigation_about_clicked');
        }
        if (this.vueApp) {
            this.vueApp.currentPage = 'about';
        }
    }
    loadProducts(options = {}) {
        if (!this.productObject) {
            console.error('❌ Elemento productObject não encontrado');
            return;
        }
        this.productObject.data = 'src/content/products/products.html';
        if (options.analytics !== false && window.clarity) {
            window.clarity.event('navigation_products_clicked');
        }
        if (this.vueApp) {
            this.vueApp.currentPage = 'products';
        }
    }
    setupEventListeners() {
        window.addEventListener('message', (event) => {
            if (event.data && this.isValidNavigationEvent(event.data)) {
                this.handleNavigationMessage(event.data);
            }
        });
        document.addEventListener('DOMContentLoaded', () => {
            this.setupNavigationLinks();
            this.setupMobileMenu();
            this.preloadResources();
        });
    }
    setupNavigationLinks() {
        const aboutLink = document.querySelector('a[href*="about"]');
        if (aboutLink) {
            aboutLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadAboutPage();
            });
        }
        const logoLink = document.querySelector('.logo');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadProducts();
            });
        }
    }
    setupMobileMenu() {
        const menuLinks = document.querySelectorAll('.menu a');
        const sideMenuCheckbox = document.getElementById('side-menu');
        menuLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (sideMenuCheckbox && sideMenuCheckbox.checked) {
                    sideMenuCheckbox.checked = false;
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }
    preloadResources() {
        setTimeout(() => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = 'src/content/about/about.html';
            document.head.appendChild(link);
        }, 2000);
    }
    setupGlobalFunctions() {
        window.loadAboutPage = () => this.loadAboutPage();
        window.loadProducts = () => this.loadProducts();
        window.mainController = this;
    }
    initializeVueApp() {
        if (typeof window.Vue === 'undefined') {
            console.warn('⚠️ Vue.js não encontrado! Navegação funcionará sem Vue.');
            return;
        }
        this.vueApp = new window.Vue({
            data: {
                currentPage: 'products'
            },
            methods: {
                navigateToAbout: () => {
                    this.loadAboutPage();
                },
                navigateToProducts: () => {
                    this.loadProducts();
                }
            }
        }).$mount('#content');
    }
    isValidNavigationEvent(data) {
        return data &&
            typeof data.type === 'string' &&
            ['about_page_loaded', 'products_page_loaded'].includes(data.type);
    }
    handleNavigationMessage(event) {
        switch (event.type) {
            case 'about_page_loaded':
                break;
            case 'products_page_loaded':
                break;
        }
    }
    getDebugInfo() {
        var _a;
        return {
            productObjectFound: !!this.productObject,
            vueAppInitialized: !!this.vueApp,
            currentPage: ((_a = this.vueApp) === null || _a === void 0 ? void 0 : _a.currentPage) || 'unknown',
            clarityEnabled: !!window.clarity
        };
    }
}
const mainController = new MainNavigationController();
if (typeof globalThis.module !== 'undefined' && globalThis.module.exports) {
    globalThis.module.exports = { MainNavigationController, mainController };
}
console.log('🧭 Main Navigation Controller TypeScript carregado com sucesso');
