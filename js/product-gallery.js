"use strict";
const ProductGalleryVue3 = {
    setup() {
        const state = Vue.reactive({
            categories: [],
            settings: {
                basePath: '/img/products/',
                fallbackImage: '/img/products/placeholder.jpg',
                lazyLoading: true,
                imageFormats: ['webp', 'jpeg', 'jpg', 'png']
            },
            loading: true,
            error: null,
            currentImageIndexes: {},
            imageRotationTimeouts: {},
            imageInTransition: {},
            animationSettings: {
                baseInterval: 7000,
                randomRange: 5000,
                transitionDuration: 300,
                autoRotate: true
            }
        });
        Vue.onMounted(async () => {
            try {
                await waitForAutoDetector();
                await loadProductData();
                startImageRotation();
            }
            catch (error) {
                console.error('❌ Erro na inicialização da galeria:', error);
                state.error = 'Erro ao carregar a galeria';
                state.loading = false;
            }
        });
        Vue.onBeforeUnmount(() => {
            stopImageRotation();
        });
        const waitForAutoDetector = async () => {
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
        const loadProductData = async () => {
            try {
                state.loading = true;
                state.error = null;
                state.categories = await window.autoDetector.autoDetectAllCategories();
                if (state.categories.length === 0) {
                    throw new Error('Nenhuma categoria encontrada');
                }
                state.categories.forEach((category) => {
                    state.currentImageIndexes[category.id] = 0;
                    state.imageInTransition[category.id] = false;
                });
            }
            catch (error) {
                console.error('❌ Erro ao carregar produtos:', error);
                state.error = 'Falha ao carregar produtos. Tente novamente.';
                throw error;
            }
            finally {
                state.loading = false;
            }
        };
        const startImageRotation = () => {
            if (!state.animationSettings.autoRotate)
                return;
            state.categories.forEach((category) => {
                if (category.images.length > 1) {
                    scheduleNextRotation(category.id);
                }
            });
        };
        const calculateNextInterval = () => {
            const randomMs = Math.floor(Math.random() * state.animationSettings.randomRange);
            return state.animationSettings.baseInterval + randomMs;
        };
        const scheduleNextRotation = (categoryId) => {
            const interval = calculateNextInterval();
            const timeoutId = window.setTimeout(() => {
                const category = state.categories.find((cat) => cat.id === categoryId);
                if (category && state.animationSettings.autoRotate) {
                    performImageRotation(categoryId);
                    scheduleNextRotation(categoryId);
                }
            }, interval);
            state.imageRotationTimeouts[categoryId] = timeoutId;
        };
        const performImageRotation = (categoryId) => {
            const category = state.categories.find((cat) => cat.id === categoryId);
            if (!category || category.images.length <= 1)
                return;
            if (state.imageInTransition[categoryId])
                return;
            state.imageInTransition[categoryId] = true;
            const cardElement = document.querySelector(`[data-category-id="${categoryId}"]`);
            const imageElement = cardElement === null || cardElement === void 0 ? void 0 : cardElement.querySelector('.category-image');
            if (imageElement) {
                performFadeTransition(categoryId, imageElement, category);
            }
            else {
                updateImageIndex(categoryId, category);
                state.imageInTransition[categoryId] = false;
            }
        };
        const performFadeTransition = (categoryId, imageElement, category) => {
            imageElement.style.transition = `opacity ${state.animationSettings.transitionDuration}ms ease-in-out`;
            imageElement.style.opacity = '0';
            setTimeout(() => {
                updateImageIndex(categoryId, category);
                Vue.nextTick(() => {
                    setTimeout(() => {
                        imageElement.style.opacity = '1';
                        setTimeout(() => {
                            state.imageInTransition[categoryId] = false;
                        }, state.animationSettings.transitionDuration);
                    }, 50);
                });
            }, state.animationSettings.transitionDuration);
        };
        const updateImageIndex = (categoryId, category) => {
            const currentIndex = state.currentImageIndexes[categoryId] || 0;
            const nextIndex = (currentIndex + 1) % category.images.length;
            state.currentImageIndexes[categoryId] = nextIndex;
        };
        const stopImageRotation = () => {
            Object.keys(state.imageRotationTimeouts).forEach((categoryId) => {
                const timeoutId = state.imageRotationTimeouts[categoryId];
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            });
            state.imageRotationTimeouts = {};
            state.imageInTransition = {};
        };
        const getImagePath = (category, imageName) => {
            if (!imageName)
                return state.settings.fallbackImage;
            return `${state.settings.basePath}${category.folder}/${imageName}`;
        };
        const getCurrentImage = (category) => {
            if (!category.images || category.images.length === 0) {
                return null;
            }
            const currentIndex = state.currentImageIndexes[category.id] || 0;
            return category.images[currentIndex];
        };
        const handleImageError = (event, category) => {
            const img = event.target;
            console.warn(`⚠️ Imagem não encontrada: ${img.src}`);
            img.src = state.settings.fallbackImage;
        };
        const navigateToCategory = (categoryId) => {
            const category = state.categories.find((cat) => cat.id === categoryId);
            if (category) {
                const detailsUrl = `/src/content/products/details/${categoryId}.html`;
                window.location.href = detailsUrl;
            }
        };
        const retryLoad = async () => {
            state.error = null;
            await loadProductData();
            if (!state.error) {
                startImageRotation();
            }
        };
        const forceRotation = (categoryId) => {
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
        const validCategories = Vue.computed(() => {
            return state.categories.filter((cat) => cat.images && cat.images.length > 0);
        });
        return {
            ...Vue.toRefs(state),
            navigateToCategory,
            getImagePath,
            getCurrentImage,
            handleImageError,
            retryLoad,
            forceRotation,
            getDebugInfo,
            validCategories
        };
    },
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
if (typeof Vue !== 'undefined') {
    if (Vue.createApp) {
        window.ProductGalleryApp = Vue.createApp({
            components: {
                'product-gallery': ProductGalleryVue3
            }
        });
    }
    else if (Vue.component) {
        console.warn('Vue 2 detectado - atualize para Vue 3 para funcionalidade completa');
    }
}
else {
    console.error('Vue.js não encontrado! Carregue Vue 3 antes deste script.');
}
window.ProductGalleryComponent = ProductGalleryVue3;
