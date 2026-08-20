/**
 * Sistema de navegação principal - Ateliê Dmax TypeScript
 * Compatible com GitHub Pages (client-side only)
 * 
 * Workflow: TypeScript (desenvolvimento) → JavaScript (produção)
 * Comando de build: tsc ts/main.ts --outDir js --target ES2018
 */

/// <reference path="global.d.ts" />

// Core interfaces
interface NavigationEvent {
  type: 'about_page_loaded' | 'products_page_loaded';
  data?: any;
}

interface AnalyticsTracker {
  event(name: string): void;
}

interface NavigationOptions {
  analytics?: boolean;
  preload?: boolean;
}

/**
 * 🧭 Controller principal de navegação
 */
class MainNavigationController {
  private productObject: HTMLObjectElement | null = null;
  private vueApp: any = null;
  private vueState: any = null;

  constructor() {
    this.init();
  }

  /**
   * 🚀 Inicialização do controller
   */
  private init(): void {
    this.productObject = document.getElementById('productObject') as HTMLObjectElement;
    this.setupEventListeners();
    this.setupGlobalFunctions();
    this.initializeVueApp();
  }

  /**
   * 📖 Carrega página Sobre
   */
  loadAboutPage(options: NavigationOptions = {}): void {
    if (!this.productObject) {
      console.error('❌ Elemento productObject não encontrado');
      return;
    }

    this.productObject.data = 'src/content/about/about.html';
    
    // Analytics tracking
    if (options.analytics !== false && (window as any).clarity) {
      (window as any).clarity.event('navigation_about_clicked');
    }

    // Update Vue state
    if (this.vueState) {
      this.vueState.currentPage = 'about';
    }
  }

  /**
   * 🛍️ Carrega página de produtos
   */
  loadProducts(options: NavigationOptions = {}): void {
    if (!this.productObject) {
      console.error('❌ Elemento productObject não encontrado');
      return;
    }

    this.productObject.data = 'src/content/products/products.html';
    
    // Analytics tracking
    if (options.analytics !== false && (window as any).clarity) {
      (window as any).clarity.event('navigation_products_clicked');
    }

    // Update Vue state
    if (this.vueState) {
      this.vueState.currentPage = 'products';
    }
  }

  /**
   * 🎧 Configura event listeners
   */
  private setupEventListeners(): void {
    // Message listener para iframes/objects
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.data && this.isValidNavigationEvent(event.data)) {
        this.handleNavigationMessage(event.data as NavigationEvent);
      }
    });

    // DOM ready event listeners
    document.addEventListener('DOMContentLoaded', () => {
      this.setupNavigationLinks();
      this.setupMobileMenu();
      this.preloadResources();
    });
  }

  /**
   * 🔗 Configura links de navegação
   */
  private setupNavigationLinks(): void {
    // Link "Sobre nós"
    const aboutLink = document.querySelector('a[href*="about"]') as HTMLAnchorElement;
    if (aboutLink) {
      aboutLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        this.loadAboutPage();
      });
    }

    // Logo para voltar aos produtos
    const logoLink = document.querySelector('.logo') as HTMLElement;
    if (logoLink) {
      logoLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        this.loadProducts();
      });
    }
  }

  /**
   * 📱 Configura menu móvel
   */
  private setupMobileMenu(): void {
    const menuLinks = document.querySelectorAll('.menu a') as NodeListOf<HTMLAnchorElement>;
    const sideMenuCheckbox = document.getElementById('side-menu') as HTMLInputElement;
    
    menuLinks.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', () => {
        // Fechar o menu móvel
        if (sideMenuCheckbox && sideMenuCheckbox.checked) {
          sideMenuCheckbox.checked = false;
          document.body.classList.remove('menu-open');
        }
      });
    });
  }

  /**
   * ⚡ Preload de recursos
   */
  private preloadResources(): void {
    // Performance: preload da página sobre
    setTimeout(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = 'src/content/about/about.html';
      document.head.appendChild(link);
    }, 2000);
  }

  /**
   * 🌍 Configura funções globais para compatibilidade
   */
  private setupGlobalFunctions(): void {
    (window as any).loadAboutPage = () => this.loadAboutPage();
    (window as any).loadProducts = () => this.loadProducts();
    (window as any).mainController = this;
  }

  /**
   * 🎯 Inicializa Vue.js application
   */
  private initializeVueApp(): void {
    if (typeof (window as any).Vue === 'undefined') {
      console.warn('⚠️ Vue.js não encontrado! Navegação funcionará sem Vue.');
      return;
    }

    const { createApp, reactive } = (window as any).Vue;
    this.vueState = reactive({ currentPage: 'products' });
    const state = this.vueState;
    const self = this;

    this.vueApp = createApp({
      setup() {
        return {
          state,
          navigateToAbout: () => self.loadAboutPage(),
          navigateToProducts: () => self.loadProducts()
        };
      }
    }).mount('#content');
  }

  /**
   * ✅ Valida se é um evento de navegação válido
   */
  private isValidNavigationEvent(data: any): boolean {
    return data && 
           typeof data.type === 'string' && 
           ['about_page_loaded', 'products_page_loaded'].includes(data.type);
  }

  /**
   * 📨 Manipula mensagens de navegação
   */
  private handleNavigationMessage(event: NavigationEvent): void {
    switch(event.type) {
      case 'about_page_loaded':
        // Página sobre carregada com sucesso
        break;
      case 'products_page_loaded':
        // Página produtos carregada com sucesso
        break;
    }
  }

  /**
   * 🔧 Debug - obtém informações do controller
   */
  getDebugInfo(): object {
    return {
      productObjectFound: !!this.productObject,
      vueAppInitialized: !!this.vueApp,
      currentPage: this.vueApp?.currentPage || 'unknown',
      clarityEnabled: !!(window as any).clarity
    };
  }
}

// Initialize main controller when script loads
const mainController = new MainNavigationController();

// Export for module systems (usando any para evitar erros de tipagem)
if (typeof (globalThis as any).module !== 'undefined' && (globalThis as any).module.exports) {
  (globalThis as any).module.exports = { MainNavigationController, mainController };
}

console.log('🧭 Main Navigation Controller TypeScript carregado com sucesso');
