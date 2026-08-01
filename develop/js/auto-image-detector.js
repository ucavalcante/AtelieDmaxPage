"use strict";
var _a;
class AutoImageDetector {
    constructor() {
        this.categoriesLoaded = false;
        const isDevelop = typeof window !== 'undefined' && window.location.pathname.includes('/develop');
        const prefix = isDevelop ? '/develop' : '';
        this.basePath = `${prefix}/img/products/`;
        this.knownCategories = this.getDefaultCategories();
    }
    async loadCategoriesFromJson() {
        if (this.categoriesLoaded)
            return;
        try {
            console.log('Tentando carregar categorias do products.json...');
            const isDevelop = typeof window !== 'undefined' && window.location.pathname.includes('/develop');
            const jsonUrl = isDevelop ? '/develop/data/products.json' : '/data/products.json';
            const response = await fetch(jsonUrl);
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
    async detectImagesForCategory(folderName) {
        await this.loadCategoriesFromJson();
        const config = this.knownCategories.find(c => c.folder === folderName || c.folder === folderName.toLowerCase());
        const images = await this.detectImagesInCategory(folderName);
        if (images.length === 0)
            return null;
        return {
            id: folderName,
            name: config ? config.name : folderName,
            description: config ? config.description : '',
            folder: folderName,
            images: images,
            keywords: config ? config.keywords : []
        };
    }
    async detectImagesInCategory(folderName) {
        console.log(`Analisando pasta: ${folderName}`);
        const listedImages = await this.detectImagesFromDirectoryListing(folderName);
        if (listedImages.length > 0) {
            console.log(`✅ Directory Listing/API encontrou ${listedImages.length} imagens em ${folderName}`);
            return listedImages;
        }
        console.log(`Nenhuma imagem listada pela API/Diretório para ${folderName}`);
        return [];
    }
    async detectImagesFromDirectoryListing(folderName) {
        const jsonCategory = this.knownCategories.find((c) => c.folder === folderName || c.folder === folderName.toLowerCase());
        if (jsonCategory && Array.isArray(jsonCategory.images) && jsonCategory.images.length > 0) {
            console.log(`✅ products.json retornou ${jsonCategory.images.length} imagens para ${folderName}`);
            return jsonCategory.images;
        }
        const githubApiImages = await this.detectImagesFromGitHubAPI(folderName);
        if (githubApiImages.length > 0) {
            console.log(`✅ GitHub Contents API retornou ${githubApiImages.length} imagens para ${folderName}`);
            return githubApiImages;
        }
        const folderUrl = `${this.basePath}${folderName}/`;
        try {
            const response = await fetch(folderUrl);
            if (!response.ok)
                return [];
            const html = await response.text();
            const imgRegex = /href=["']([^"']+\.(?:jpeg|jpg|png|webp))["']/gi;
            const foundFiles = new Set();
            let match;
            while ((match = imgRegex.exec(html)) !== null) {
                const fullPath = match[1];
                const filename = fullPath.split('/').pop();
                if (filename && !filename.startsWith('.')) {
                    foundFiles.add(filename);
                }
            }
            return Array.from(foundFiles);
        }
        catch (e) {
            console.warn(`Directory listing não disponível para ${folderName}:`, e);
            return [];
        }
    }
    async detectImagesFromGitHubAPI(folderName) {
        const isDevelop = window.location.pathname.includes('/develop');
        const ref = isDevelop ? 'develop' : 'master';
        const apiUrl = `https://api.github.com/repos/ucavalcante/AtelieDmaxPage/contents/img/products/${folderName}?ref=${ref}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok)
                return [];
            const items = await response.json();
            if (!Array.isArray(items))
                return [];
            const imageExtensions = ['.jpeg', '.jpg', '.png', '.webp'];
            return items
                .filter((item) => item.type === 'file' && imageExtensions.some(ext => item.name.toLowerCase().endsWith(ext)))
                .map((item) => item.name);
        }
        catch (e) {
            console.warn(`GitHub API indisponível para ${folderName}:`, e);
            return [];
        }
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
