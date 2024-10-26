"use strict";
const { createApp, ref, reactive, computed, onMounted, onUnmounted } = Vue;
const ProductDetailApp = {
    setup() {
        const state = reactive({
            loading: true,
            error: null,
            productData: {
                id: '',
                name: '',
                description: '',
                folder: ''
            },
            images: [],
            imageDescriptions: {},
            currentImageIndex: 0
        });
        const settings = {
            basePath: '/img/products/',
            fallbackImage: '/img/products/placeholder.jpg',
            lazyLoading: true,
            imageFormats: ['webp', 'jpeg', 'jpg', 'png'],
            autoDetector: null
        };
        onMounted(async () => {
            await initializeProduct();
        });
        const initializeProduct = async () => {
            try {
                state.loading = true;
                state.error = null;
                const productId = extractProductIdFromUrl();
                if (!productId) {
                    throw new Error('ID do produto não encontrado na URL');
                }
                await loadProductData(productId);
                await loadProductImages(productId);
                await loadImageDescriptions(productId);
            }
            catch (error) {
                console.error('Erro ao inicializar produto:', error);
                state.error = error.message || 'Erro ao carregar produto';
            }
            finally {
                state.loading = false;
            }
        };
        const extractProductIdFromUrl = () => {
            const path = window.location.pathname;
            let match = null;
            match = path.match(/\/details\/([^\/]+)\.html$/);
            if (!match) {
                match = path.match(/\/([^\/]+)\.html$/);
            }
            const productId = match ? match[1] : null;
            return productId;
        };
        const loadProductData = async (productId) => {
            try {
                const response = await fetch('/data/products.json');
                if (response.ok) {
                    const data = await response.json();
                    const category = data.categories.find((cat) => cat.id === productId);
                    if (category) {
                        state.productData = {
                            id: category.id,
                            name: category.name,
                            description: category.description,
                            folder: category.folder || category.id
                        };
                        return;
                    }
                }
                state.productData = getHardcodedProductData(productId);
            }
            catch (error) {
                console.warn('Erro ao carregar products.json, usando dados hardcoded:', error);
                state.productData = getHardcodedProductData(productId);
            }
        };
        const getHardcodedProductData = (productId) => {
            const hardcodedData = {
                'enxoval-bebe': {
                    id: 'enxoval-bebe',
                    name: 'Enxoval de Bebê',
                    description: 'Enxovais personalizados com bordados únicos para bebês',
                    folder: 'enxoval-bebe'
                },
                'sapato-infantil': {
                    id: 'sapato-infantil',
                    name: 'Sapato Infantil Customizado',
                    description: 'Sapatos infantis personalizados com bordados e decorações únicas',
                    folder: 'sapato-infantil'
                },
                'batizado': {
                    id: 'batizado',
                    name: 'Batizado',
                    description: 'Artigos especiais para cerimônias de batizado',
                    folder: 'batizado'
                },
                'caixa-convite': {
                    id: 'caixa-convite',
                    name: 'Caixa Convite',
                    description: 'Convites em caixas personalizadas para ocasiões especiais',
                    folder: 'caixa-convite'
                },
                'ocasioes-especiais': {
                    id: 'ocasioes-especiais',
                    name: 'Ocasiões Especiais',
                    description: 'Artesanatos únicos para momentos inesquecíveis',
                    folder: 'ocasioes-especiais'
                },
                'depoimentos': {
                    id: 'depoimentos',
                    name: 'Depoimentos',
                    description: 'Avaliações e comentários de nossos queridos clientes',
                    folder: 'depoimentos'
                }
            };
            return hardcodedData[productId] || {
                id: productId,
                name: productId.charAt(0).toUpperCase() + productId.slice(1),
                description: 'Produto artesanal único do Ateliê Dmax',
                folder: productId
            };
        };
        const loadProductImages = async (productId) => {
            try {
                if (window.autoDetector) {
                    console.log('Usando auto-detector para carregar imagens...');
                    await window.autoDetector.loadCategoriesFromJson();
                    const detectedCategory = await window.autoDetector.detectImagesForCategory(state.productData.folder);
                    if (detectedCategory && detectedCategory.images.length > 0) {
                        state.images = detectedCategory.images;
                        console.log(`✅ ${state.images.length} imagens detectadas para ${productId}`);
                        return;
                    }
                }
                await loadImagesManually(productId);
            }
            catch (error) {
                console.warn('Erro ao usar auto-detector, tentando carregamento manual:', error);
                await loadImagesManually(productId);
            }
        };
        const loadImagesManually = async (productId) => {
            const commonImageNames = [
                'img001.jpeg', 'img002.jpeg', 'img003.jpeg', 'img004.jpeg', 'img005.jpeg',
                'img006.jpeg', 'img007.jpeg', 'img008.jpeg', 'img009.jpeg', 'img010.jpeg',
                'img011.jpeg', 'img012.jpeg', 'img013.jpeg', 'img014.jpeg', 'img015.jpeg',
                'img016.jpeg', 'img017.jpeg', 'img018.jpeg', 'img019.jpeg', 'img020.jpeg',
                'img021.jpeg', 'img022.jpeg', 'img023.jpeg', 'img024.jpeg', 'img025.jpeg'
            ];
            const validImages = [];
            const folder = state.productData.folder;
            for (const imageName of commonImageNames) {
                const imageUrl = `${settings.basePath}${folder}/${imageName}`;
                try {
                    const exists = await checkImageExists(imageUrl);
                    if (exists) {
                        validImages.push(imageName);
                    }
                }
                catch (error) {
                }
            }
            if (validImages.length === 0) {
                throw new Error('Nenhuma imagem encontrada para este produto');
            }
            state.images = validImages;
            console.log(`✅ ${validImages.length} imagens carregadas manualmente para ${productId}`);
        };
        const checkImageExists = (imageUrl) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = imageUrl;
            });
        };
        const loadImageDescriptions = async (productId) => {
            try {
                const descriptionsUrl = `/data/descriptions/${productId}.json`;
                const response = await fetch(descriptionsUrl);
                if (response.ok) {
                    const descriptions = await response.json();
                    state.imageDescriptions = descriptions;
                    console.log('✅ Descrições de imagens carregadas do arquivo centralizado');
                }
                else {
                    console.log('ℹ️ Arquivo de descrições não encontrado, usando descrições padrão');
                }
            }
            catch (error) {
                console.log('ℹ️ Nenhuma descrição personalizada disponível');
            }
        };
        const nextImage = () => {
            if (state.images.length > 1) {
                state.currentImageIndex = (state.currentImageIndex + 1) % state.images.length;
            }
        };
        const previousImage = () => {
            if (state.images.length > 1) {
                state.currentImageIndex = state.currentImageIndex === 0
                    ? state.images.length - 1
                    : state.currentImageIndex - 1;
            }
        };
        const goToImage = (index) => {
            if (index >= 0 && index < state.images.length) {
                state.currentImageIndex = index;
            }
        };
        const handleKeyNavigation = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    previousImage();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    nextImage();
                    break;
                case 'Escape':
                    event.preventDefault();
                    goBack();
                    break;
            }
        };
        onMounted(() => {
            document.addEventListener('keydown', handleKeyNavigation);
        });
        onUnmounted(() => {
            document.removeEventListener('keydown', handleKeyNavigation);
        });
        const getCurrentImageUrl = () => {
            if (state.images.length === 0)
                return settings.fallbackImage;
            const imageName = state.images[state.currentImageIndex];
            return getImageUrl(imageName);
        };
        const getImageUrl = (imageName) => {
            return `${settings.basePath}${state.productData.folder}/${imageName}`;
        };
        const getCurrentImageDescription = () => {
            var _a, _b;
            if (state.images.length === 0)
                return '';
            const imageName = state.images[state.currentImageIndex];
            const key = imageName.replace(/\.[^/.]+$/, '');
            return ((_a = state.imageDescriptions[key]) === null || _a === void 0 ? void 0 : _a.description) ||
                ((_b = state.imageDescriptions[imageName]) === null || _b === void 0 ? void 0 : _b.description) ||
                `${state.productData.name} - Imagem ${state.currentImageIndex + 1}`;
        };
        const getImageDescription = (imageName, index) => {
            var _a, _b;
            const key = imageName.replace(/\.[^/.]+$/, '');
            return ((_a = state.imageDescriptions[key]) === null || _a === void 0 ? void 0 : _a.description) ||
                ((_b = state.imageDescriptions[imageName]) === null || _b === void 0 ? void 0 : _b.description) ||
                `${state.productData.name} - Imagem ${index + 1}`;
        };
        const getCurrentImageData = () => {
            if (state.images.length === 0)
                return { description: '' };
            const imageName = state.images[state.currentImageIndex];
            const key = imageName.replace(/\.[^/.]+$/, '');
            return state.imageDescriptions[key] || state.imageDescriptions[imageName] || { description: '' };
        };
        const handleImageError = (event) => {
            const target = event.target;
            console.warn('Erro ao carregar imagem:', target.src);
            target.src = settings.fallbackImage;
        };
        const getWhatsAppLink = () => {
            const productName = encodeURIComponent(state.productData.name);
            const message = encodeURIComponent(`Olá! Gostaria de mais informações sobre: ${state.productData.name}`);
            return `https://api.whatsapp.com/send?phone=551198338-7957&text=${message}`;
        };
        const goBack = () => {
            if (document.referrer && document.referrer.includes(window.location.origin)) {
                window.history.back();
            }
            else {
                window.location.href = '/';
            }
        };
        const retryLoad = async () => {
            await initializeProduct();
        };
        const hasMultipleImages = computed(() => state.images.length > 1);
        return {
            ...Vue.toRefs(state),
            hasMultipleImages,
            nextImage,
            previousImage,
            goToImage,
            getCurrentImageUrl,
            getImageUrl,
            getCurrentImageDescription,
            getImageDescription,
            getCurrentImageData,
            handleImageError,
            getWhatsAppLink,
            goBack,
            retryLoad
        };
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const app = createApp(ProductDetailApp);
    app.mount('#product-detail-app');
});
