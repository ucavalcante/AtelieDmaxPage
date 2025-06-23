/**
 * Vue 3 Product Gallery Component - TypeScript
 * Ateliê Dmax - Galeria de Produtos Artesanais
 * 
 * Features:
 * - Auto-detecção 100% automática de imagens
 * - Rotação com tempo variável (5-10 segundos)
 * - Transição fade suave entre imagens
 * - Compatibilidade Vue 2/3
 * - TypeScript com type safety
 * 
 * Build: tsc ts/product-gallery-vue3.ts --outDir js --target ES2018 --lib ES2018,DOM
 */

/// <reference path="vue-types.d.ts" />

// ========================================
// INTERFACES & TYPES
// ========================================

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  folder: string;
  images: string[];
  keywords: string[];
}

interface ProductSettings {
  basePath: string;
  fallbackImage: string;
  lazyLoading: boolean;
  imageFormats: string[];
}

interface AnimationSettings {
  baseInterval: number;          // Tempo base: 5000ms (5s)
  randomRange: number;           // Variação: 5000ms (0-5s extras)
  transitionDuration: number;    // Fade: 500ms
  autoRotate: boolean;
}

interface GalleryState {
  categories: ProductCategory[];
  settings: ProductSettings;
  loading: boolean;
  error: string | null;
  currentImageIndexes: Record<string, number>;
  imageRotationTimeouts: Record<string, number>;
  imageInTransition: Record<string, boolean>;
  animationSettings: AnimationSettings;
}

// ========================================
// MAIN COMPONENT
// ========================================

const ProductGalleryVue3 = {
  setup() {
    // ====================================
    // REACTIVE STATE
    // ====================================
    const state = Vue.reactive({
      categories: [] as ProductCategory[],
      settings: {
        basePath: '/img/products/',
        fallbackImage: '/img/products/placeholder.jpg',
        lazyLoading: true,
        imageFormats: ['webp', 'jpeg', 'jpg', 'png']
      } as ProductSettings,
      loading: true,
      error: null as string | null,
      currentImageIndexes: {} as Record<string, number>,
      imageRotationTimeouts: {} as Record<string, number>,
      imageInTransition: {} as Record<string, boolean>,
      animationSettings: {
        baseInterval: 7000,        // segundos base
        randomRange: 5000,         // segundos extras
        transitionDuration: 300,   // fade
        autoRotate: true
      } as AnimationSettings
    });

    // ====================================
    // LIFECYCLE HOOKS
    // ====================================
    Vue.onMounted(async () => {
      try {
        await waitForAutoDetector();
        await loadProductData();
        startImageRotation();
      } catch (error) {
        console.error('❌ Erro na inicialização da galeria:', error);
        state.error = 'Erro ao carregar a galeria';
        state.loading = false;
      }
    });

    Vue.onBeforeUnmount(() => {
      stopImageRotation();
    });

    // ====================================
    // CORE METHODS
    // ====================================
    
    const waitForAutoDetector = async (): Promise<void> => {
      let attempts = 0;
      const maxAttempts = 20;
      
      while (!window.autoDetector && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
      
      if (!window.autoDetector) {
        throw new Error('Auto-detector não disponível após 2 segundos');
      }
    };

    const loadProductData = async (): Promise<void> => {
      try {
        state.loading = true;
        state.error = null;
        
        // Auto-detecção completa
        state.categories = await window.autoDetector.autoDetectAllCategories();
        
        if (state.categories.length === 0) {
          throw new Error('Nenhuma categoria encontrada');
        }
        
        // Inicializa índices para rotação
        state.categories.forEach((category: ProductCategory) => {
          state.currentImageIndexes[category.id] = 0;
          state.imageInTransition[category.id] = false;
        });
        
      } catch (error) {
        console.error('❌ Erro ao carregar produtos:', error);
        state.error = 'Falha ao carregar produtos. Tente novamente.';
        throw error;
      } finally {
        state.loading = false;
      }
    };

    // ====================================
    // IMAGE ROTATION SYSTEM
    // ====================================
    
    const startImageRotation = (): void => {
      if (!state.animationSettings.autoRotate) return;
      
      state.categories.forEach((category: ProductCategory) => {
        if (category.images.length > 1) {
          scheduleNextRotation(category.id);
        }
      });
    };

    const calculateNextInterval = (): number => {
      const randomMs = Math.floor(Math.random() * state.animationSettings.randomRange);
      return state.animationSettings.baseInterval + randomMs;
    };

    const scheduleNextRotation = (categoryId: string): void => {
      const interval = calculateNextInterval();
      
      const timeoutId = window.setTimeout(() => {
        const category = state.categories.find((cat: ProductCategory) => cat.id === categoryId);
        if (category && state.animationSettings.autoRotate) {
          performImageRotation(categoryId);
          // Recursão: agenda próxima rotação
          scheduleNextRotation(categoryId);
        }
      }, interval);
      
      state.imageRotationTimeouts[categoryId] = timeoutId;
    };

    const performImageRotation = (categoryId: string): void => {
      const category = state.categories.find((cat: ProductCategory) => cat.id === categoryId);
      if (!category || category.images.length <= 1) return;
      
      // Previne sobreposição de transições
      if (state.imageInTransition[categoryId]) return;
      
      state.imageInTransition[categoryId] = true;
      
      // Encontra elementos DOM
      const cardElement = document.querySelector(`[data-category-id="${categoryId}"]`);
      const imageElement = cardElement?.querySelector('.category-image') as HTMLImageElement;
      
      if (imageElement) {
        performFadeTransition(categoryId, imageElement, category);
      } else {
        // Fallback sem animação
        updateImageIndex(categoryId, category);
        state.imageInTransition[categoryId] = false;
      }
    };

    const performFadeTransition = (
      categoryId: string, 
      imageElement: HTMLImageElement, 
      category: ProductCategory
    ): void => {
      // Configura transição CSS
      imageElement.style.transition = `opacity ${state.animationSettings.transitionDuration}ms ease-in-out`;
      
      // Fase 1: Fade out
      imageElement.style.opacity = '0';
      
      // Fase 2: Troca de imagem (após fade out)
      setTimeout(() => {
        updateImageIndex(categoryId, category);
        
        // Fase 3: Fade in (após Vue atualizar DOM)
        Vue.nextTick(() => {
          setTimeout(() => {
            imageElement.style.opacity = '1';
            
            // Fase 4: Cleanup (após fade in completo)
            setTimeout(() => {
              state.imageInTransition[categoryId] = false;
            }, state.animationSettings.transitionDuration);
            
          }, 50); // Pequeno delay para garantir atualização do DOM
        });
        
      }, state.animationSettings.transitionDuration);
    };

    const updateImageIndex = (categoryId: string, category: ProductCategory): void => {
      const currentIndex = state.currentImageIndexes[categoryId] || 0;
      const nextIndex = (currentIndex + 1) % category.images.length;
      state.currentImageIndexes[categoryId] = nextIndex;
    };

    const stopImageRotation = (): void => {
      Object.keys(state.imageRotationTimeouts).forEach((categoryId: string) => {
        const timeoutId = state.imageRotationTimeouts[categoryId];
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      });
      
      // Limpa estado
      state.imageRotationTimeouts = {};
      state.imageInTransition = {};
    };

    // ====================================
    // UTILITY METHODS
    // ====================================
    
    const getImagePath = (category: ProductCategory, imageName: string | null): string => {
      if (!imageName) return state.settings.fallbackImage;
      return `${state.settings.basePath}${category.folder}/${imageName}`;
    };

    const getCurrentImage = (category: ProductCategory): string | null => {
      if (!category.images || category.images.length === 0) {
        return null;
      }
      
      const currentIndex = state.currentImageIndexes[category.id] || 0;
      return category.images[currentIndex];
    };

    const handleImageError = (event: Event, category: ProductCategory): void => {
      const img = event.target as HTMLImageElement;
      console.warn(`⚠️ Imagem não encontrada: ${img.src}`);
      img.src = state.settings.fallbackImage;
    };

    const navigateToCategory = (categoryId: string): void => {
      const category = state.categories.find((cat: ProductCategory) => cat.id === categoryId);
      if (category) {
        const detailsUrl = `/src/content/products/details/${categoryId}.html`;
        window.location.href = detailsUrl;
      }
    };

    const retryLoad = async (): Promise<void> => {
      state.error = null;
      await loadProductData();
      if (!state.error) {
        startImageRotation();
      }
    };

    // ====================================
    // DEBUG & UTILITIES
    // ====================================
    
    const forceRotation = (categoryId: string): void => {
      performImageRotation(categoryId);
    };

    const getDebugInfo = () => {
      return {
        categories: state.categories.length,
        currentIndexes: state.currentImageIndexes,
        activeTimeouts: Object.keys(state.imageRotationTimeouts).length,
        inTransition: state.imageInTransition,
        settings: state.animationSettings,
        intervalRange: `${state.animationSettings.baseInterval}-${state.animationSettings.baseInterval + state.animationSettings.randomRange}ms`,
        vueVersion: '3.x (Composition API)'
      };
    };

    // ====================================
    // COMPUTED PROPERTIES
    // ====================================
    
    const validCategories = Vue.computed(() => {
      return state.categories.filter((cat: ProductCategory) => cat.images && cat.images.length > 0);
    });

    // ====================================
    // COMPONENT RETURN
    // ====================================
    
    return {
      // State (usando toRefs para manter reatividade)
      ...Vue.toRefs(state),
      
      // Methods
      navigateToCategory,
      getImagePath,
      getCurrentImage,
      handleImageError,
      retryLoad,
      forceRotation,
      getDebugInfo,
      
      // Computed
      validCategories
    };
  },

  // ====================================
  // TEMPLATE (Mesmo para Vue 2/3)
  // ====================================
  template: `
    <div class="product-gallery">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner" aria-label="Carregando produtos..."></div>
        <p>Carregando produtos...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="retryLoad" class="retry-btn">
          Tentar novamente
        </button>
      </div>
      
      <!-- Main Gallery -->
      <section v-else class="card-container">
        <div 
          v-for="category in validCategories" 
          :key="category.id"
          class="card"
          :data-category-id="category.id"
          @click="navigateToCategory(category.id)"
          :aria-label="'Ver produtos de ' + category.name"
          tabindex="0"
          @keydown.enter="navigateToCategory(category.id)"
          @keydown.space.prevent="navigateToCategory(category.id)"
        >
          <div class="crop">
            <!-- Image Container -->
            <div 
              v-if="category.images.length > 0"
              class="image-container"
            >
              <img 
                :src="getImagePath(category, getCurrentImage(category))"
                :alt="category.description"
                @error="handleImageError($event, category)"
                :loading="settings.lazyLoading ? 'lazy' : 'eager'"
                class="category-image"
              />
              
              <!-- Image Indicators -->
              <div 
                v-if="category.images.length > 1" 
                class="image-indicators"
              >
                <div class="indicator-dots">
                  <button
                    v-for="(image, index) in category.images"
                    :key="index"
                    :class="['dot', { active: currentImageIndexes[category.id] === index }]"
                    @click.stop="forceRotation(category.id)"
                    :aria-label="'Ver imagem ' + (index + 1) + ' de ' + category.name"
                  ></button>
                </div>
              </div>
            </div>
            
            <!-- Fallback -->
            <div 
              v-else 
              :class="'theme' + (validCategories.indexOf(category) + 1)"
              class="fallback-theme"
            ></div>
          </div>
          
          <!-- Card Content -->
          <h5>{{ category.name }}</h5>
          <p class="category-description">{{ category.description }}</p>
        </div>
      </section>
    </div>
  `
};

// ========================================
// REGISTRATION & INITIALIZATION
// ========================================

// Auto-detect Vue version and initialize
if (typeof Vue !== 'undefined') {
  if (Vue.createApp) {
    // Vue 3 Mode
    window.ProductGalleryApp = Vue.createApp({
      components: {
        'product-gallery': ProductGalleryVue3
      }
    });
  } else if (Vue.component) {
    // Vue 2 Fallback
    console.warn('Vue 2 detectado - atualize para Vue 3 para funcionalidade completa');
  }
} else {
  console.error('Vue.js não encontrado! Carregue Vue 3 antes deste script.');
}

// Global debug access
window.ProductGalleryComponent = ProductGalleryVue3;
