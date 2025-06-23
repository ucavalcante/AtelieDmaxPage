"use strict";
var _a;
class AutoImageDetector {
    constructor() {
        this.categoriesLoaded = false;
        this.basePath = '/img/products/';
        this.maxRetries = 20;
        this.timeoutMs = 1500;
        this.knownCategories = this.getDefaultCategories();
    }
    async loadCategoriesFromJson() {
        if (this.categoriesLoaded)
            return;
        try {
            console.log('Tentando carregar categorias do products.json...');
            const response = await fetch('/data/products.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            if (data.categories && Array.isArray(data.categories)) {
                this.knownCategories = data.categories.map((cat) => ({
                    folder: cat.id || cat.folder,
                    name: cat.name,
                    description: cat.description,
                    keywords: cat.keywords || []
                }));
                console.log(`✅ ${this.knownCategories.length} categorias carregadas do JSON`);
                this.categoriesLoaded = true;
            }
            else {
                throw new Error('Formato inválido do products.json');
            }
        }
        catch (error) {
            console.warn('⚠️ Falha ao carregar products.json:', error);
            console.log('📦 Usando categorias hardcoded como fallback');
            this.knownCategories = this.getDefaultCategories();
            this.categoriesLoaded = true;
        }
    }
    getDefaultCategories() {
        return [
            {
                folder: 'enxoval-bebe',
                name: 'Enxoval de Bebê',
                description: 'Enxovais personalizados com bordados únicos para bebês',
                keywords: ['enxoval', 'bebê', 'bordado', 'personalizado']
            },
            {
                folder: 'sapato-infantil',
                name: 'Sapato Infantil Customizado',
                description: 'Sapatos infantis personalizados com bordados e decorações únicas',
                keywords: ['sapato infantil', 'customizado', 'bordado', 'personalizado', 'criança', 'calçado']
            },
            {
                folder: 'batizado',
                name: 'Batizado',
                description: 'Artigos especiais para cerimônias de batizado',
                keywords: ['batizado', 'cerimônia', 'religioso', 'bordado eletrônico']
            },
            {
                folder: 'caixa-convite',
                name: 'Caixa Convite',
                description: 'Convites em caixas personalizadas para ocasiões especiais',
                keywords: ['convites personalizados', 'caixa', 'casamento']
            },
            {
                folder: 'ocasioes-especiais',
                name: 'Ocasiões Especiais',
                description: 'Artesanatos únicos para momentos inesquecíveis',
                keywords: ['ocasião especial', 'ateliê artesanal', 'personalizado']
            },
            {
                folder: 'depoimentos',
                name: 'Depoimentos',
                description: 'Avaliações e comentários de nossos queridos clientes',
                keywords: ['depoimentos', 'avaliações', 'clientes', 'feedback', 'testemunhos']
            }
        ];
    }
    async autoDetectAllCategories() {
        await this.loadCategoriesFromJson();
        console.log('Iniciando auto-detecção total...');
        const categories = [];
        for (const categoryConfig of this.knownCategories) {
            console.log(`Detectando: ${categoryConfig.name} (${categoryConfig.folder})`);
            const detectedImages = await this.detectImagesInCategory(categoryConfig.folder);
            if (detectedImages.length > 0) {
                console.log(`${categoryConfig.name}: ${detectedImages.length} imagens`);
                categories.push({
                    id: categoryConfig.folder,
                    name: categoryConfig.name,
                    description: categoryConfig.description,
                    folder: categoryConfig.folder,
                    images: detectedImages,
                    keywords: categoryConfig.keywords
                });
            }
            else {
                console.log(`${categoryConfig.name}: Nenhuma imagem encontrada`);
            }
        }
        console.log(`Auto-detecção concluída: ${categories.length} categorias ativas`);
        return categories;
    }
    async detectImagesInCategory(folderName) {
        console.log(`Analisando pasta: ${folderName}`);
        const patterns = this.getImagePatterns();
        for (const pattern of patterns) {
            console.log(`Testando padrão: ${pattern.name}`);
            const images = await this.testImagePattern(folderName, pattern);
            if (images.length > 0) {
                console.log(`Padrão ${pattern.name} encontrou ${images.length} imagens`);
                return images;
            }
        }
        console.log(`Nenhum padrão funcionou para ${folderName}`);
        return [];
    }
    getImagePatterns() {
        return [
            {
                name: 'img001-999.jpeg',
                generator: (i) => `img${String(i).padStart(3, '0')}.jpeg`
            },
            {
                name: 'img001-999.jpg',
                generator: (i) => `img${String(i).padStart(3, '0')}.jpg`
            },
            {
                name: 'img1-99.jpeg',
                generator: (i) => `img${i}.jpeg`
            },
            {
                name: 'img1-99.jpg',
                generator: (i) => `img${i}.jpg`
            },
            {
                name: 'image1-99.jpeg',
                generator: (i) => `image${i}.jpeg`
            },
            {
                name: 'image1-99.jpg',
                generator: (i) => `image${i}.jpg`
            },
            {
                name: 'produto1-99.jpeg',
                generator: (i) => `produto${i}.jpeg`
            },
            {
                name: 'produto1-99.jpg',
                generator: (i) => `produto${i}.jpg`
            }
        ];
    }
    async testImagePattern(folderName, pattern) {
        const foundImages = [];
        let consecutiveMisses = 0;
        const maxConsecutiveMisses = 3;
        console.log(`Testando até ${this.maxRetries} imagens com padrão ${pattern.name}...`);
        for (let i = 1; i <= this.maxRetries; i++) {
            const imageName = pattern.generator(i);
            const imagePath = `${this.basePath}${folderName}/${imageName}`;
            if (await this.imageExists(imagePath)) {
                foundImages.push(imageName);
                consecutiveMisses = 0;
                console.log(`Encontrada: ${imageName}`);
            }
            else {
                consecutiveMisses++;
                if (foundImages.length > 0 && consecutiveMisses >= maxConsecutiveMisses) {
                    console.log(`Parando busca após ${consecutiveMisses} falhas consecutivas`);
                    break;
                }
            }
        }
        return foundImages;
    }
    async imageExists(imagePath) {
        return new Promise((resolve) => {
            const img = new Image();
            const timeoutId = setTimeout(() => {
                resolve(false);
            }, this.timeoutMs);
            img.onload = () => {
                clearTimeout(timeoutId);
                resolve(true);
            };
            img.onerror = () => {
                clearTimeout(timeoutId);
                resolve(false);
            };
            img.src = imagePath;
        });
    }
    async getDetectionStats() {
        await this.loadCategoriesFromJson();
        const stats = {
            totalCategories: this.knownCategories.length,
            activeCategories: 0,
            totalImages: 0,
            categoryDetails: []
        };
        for (const category of this.knownCategories) {
            const images = await this.detectImagesInCategory(category.folder);
            const isActive = images.length > 0;
            if (isActive) {
                stats.activeCategories++;
                stats.totalImages += images.length;
            }
            stats.categoryDetails.push({
                name: category.name,
                folder: category.folder,
                imageCount: images.length,
                isActive
            });
        }
        return stats;
    }
    async debugAllImages() {
        await this.loadCategoriesFromJson();
        console.log('DEBUG: Listando todas as imagens encontradas...');
        for (const category of this.knownCategories) {
            console.group(`${category.name} (${category.folder})`);
            const images = await this.detectImagesInCategory(category.folder);
            if (images.length > 0) {
                images.forEach((img, index) => {
                    console.log(`${index + 1}. ${img}`);
                });
            }
            else {
                console.log('Nenhuma imagem encontrada');
            }
            console.groupEnd();
        }
    }
    async generateUpdatedJson() {
        const categories = await this.autoDetectAllCategories();
        const jsonData = {
            categories: categories,
            settings: {
                basePath: this.basePath,
                fallbackImage: '/img/products/placeholder.jpg',
                lazyLoading: true,
                imageFormats: ['webp', 'jpeg', 'jpg', 'png']
            },
            lastUpdated: new Date().toISOString(),
            autoGenerated: true
        };
        console.log('JSON Auto-gerado:', JSON.stringify(jsonData, null, 2));
        return jsonData;
    }
}
if (typeof window !== 'undefined') {
    window.autoDetector = new AutoImageDetector();
    console.log('AutoImageDetector TypeScript carregado e disponível globalmente');
    console.log('Categorias conhecidas:', ((_a = window.autoDetector.knownCategories) === null || _a === void 0 ? void 0 : _a.map((c) => c.name)) || []);
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Modo desenvolvimento detectado');
        window.debugAutoDetector = () => window.autoDetector.debugAllImages();
        window.getDetectionStats = () => window.autoDetector.getDetectionStats();
    }
}
console.log('Auto Image Detector TypeScript carregado');
