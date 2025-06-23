/**
 * TypeScript Source for Auto Image Detector
 * Compatible com GitHub Pages (client-side only)
 * 
 * Workflow: TypeScript (desenvolvimento) → JavaScript (produção)
 * Comando de build: tsc ts/auto-image-detector.ts --outDir js --target ES2018
 */

/// <reference path="global.d.ts" />

// Interfaces
interface CategoryConfig {
  folder: string;
  name: string;
  description: string;
  keywords: string[];
}

interface DetectedCategory {
  id: string;
  name: string;
  description: string;
  folder: string;
  images: string[];
  keywords: string[];
}

interface NamingPattern {
  name: string;
  generator: (i: number) => string;
  maxTest?: number;
}

interface DetectionStats {
  totalCategories: number;
  activeCategories: number;
  totalImages: number;
  categoryDetails: {
    name: string;
    folder: string;
    imageCount: number;
    isActive: boolean;
  }[];
}

/**
 * Auto Image Detector - Sistema 100% automático de detecção de imagens
 */
class AutoImageDetector {
  private basePath: string;
  private maxRetries: number;
  private timeoutMs: number;
  private knownCategories: CategoryConfig[];
  private categoriesLoaded: boolean = false;

  constructor() {
    this.basePath = '/img/products/';
    this.maxRetries = 20;
    this.timeoutMs = 1500;
    
    // Fallback hardcoded - usado apenas se products.json falhar
    this.knownCategories = this.getDefaultCategories();
  }

  /**
   * Carrega categorias do products.json primeiro, fallback para hardcoded
   */
  private async loadCategoriesFromJson(): Promise<void> {
    if (this.categoriesLoaded) return;

    try {
      console.log('Tentando carregar categorias do products.json...');
      const response = await fetch('/data/products.json');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.categories && Array.isArray(data.categories)) {
        this.knownCategories = data.categories.map((cat: any) => ({
          folder: cat.id || cat.folder,
          name: cat.name,
          description: cat.description,
          keywords: cat.keywords || []
        }));
        
        console.log(`✅ ${this.knownCategories.length} categorias carregadas do JSON`);
        this.categoriesLoaded = true;
      } else {
        throw new Error('Formato inválido do products.json');
      }
      
    } catch (error) {
      console.warn('⚠️ Falha ao carregar products.json:', error);
      console.log('📦 Usando categorias hardcoded como fallback');
      this.knownCategories = this.getDefaultCategories();
      this.categoriesLoaded = true;
    }
  }

  /**
   * Categorias padrão (fallback) - mantidas em sync com products.json
   */
  private getDefaultCategories(): CategoryConfig[] {
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

  /**
   * Método principal - Auto-detecção completa
   */
  async autoDetectAllCategories(): Promise<DetectedCategory[]> {
    // Garante que as categorias sejam carregadas primeiro
    await this.loadCategoriesFromJson();
    
    console.log('Iniciando auto-detecção total...');
    const categories: DetectedCategory[] = [];
    
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
      } else {
        console.log(`${categoryConfig.name}: Nenhuma imagem encontrada`);
      }
    }
    
    console.log(`Auto-detecção concluída: ${categories.length} categorias ativas`);
    return categories;
  }

  /**
   * Detecta imagens em uma categoria específica
   */
  async detectImagesInCategory(folderName: string): Promise<string[]> {
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

  /**
   * Define padrões de nomenclatura
   */
  private getImagePatterns(): NamingPattern[] {
    return [
      {
        name: 'img001-999.jpeg',
        generator: (i: number) => `img${String(i).padStart(3, '0')}.jpeg`
      },
      {
        name: 'img001-999.jpg', 
        generator: (i: number) => `img${String(i).padStart(3, '0')}.jpg`
      },
      {
        name: 'img1-99.jpeg',
        generator: (i: number) => `img${i}.jpeg`
      },
      {
        name: 'img1-99.jpg',
        generator: (i: number) => `img${i}.jpg`
      },
      {
        name: 'image1-99.jpeg',
        generator: (i: number) => `image${i}.jpeg`
      },
      {
        name: 'image1-99.jpg',
        generator: (i: number) => `image${i}.jpg`
      },
      {
        name: 'produto1-99.jpeg',
        generator: (i: number) => `produto${i}.jpeg`
      },
      {
        name: 'produto1-99.jpg',
        generator: (i: number) => `produto${i}.jpg`
      }
    ];
  }

  /**
   * Testa um padrão específico de nomenclatura
   */
  private async testImagePattern(folderName: string, pattern: NamingPattern): Promise<string[]> {
    const foundImages: string[] = [];
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
      } else {
        consecutiveMisses++;
        
        if (foundImages.length > 0 && consecutiveMisses >= maxConsecutiveMisses) {
          console.log(`Parando busca após ${consecutiveMisses} falhas consecutivas`);
          break;
        }
      }
    }
    
    return foundImages;
  }

  /**
   * Verifica se uma imagem existe
   */
  private async imageExists(imagePath: string): Promise<boolean> {
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

  /**
   * Obtém estatísticas do sistema
   */
  async getDetectionStats(): Promise<DetectionStats> {
    // Garante que as categorias sejam carregadas primeiro
    await this.loadCategoriesFromJson();
    
    const stats: DetectionStats = {
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

  /**
   * Utilitário para debug - lista todas as imagens encontradas
   */
  async debugAllImages(): Promise<void> {
    // Garante que as categorias sejam carregadas primeiro
    await this.loadCategoriesFromJson();
    
    console.log('DEBUG: Listando todas as imagens encontradas...');
    
    for (const category of this.knownCategories) {
      console.group(`${category.name} (${category.folder})`);
      const images = await this.detectImagesInCategory(category.folder);
      
      if (images.length > 0) {
        images.forEach((img, index) => {
          console.log(`${index + 1}. ${img}`);
        });
      } else {
        console.log('Nenhuma imagem encontrada');
      }
      
      console.groupEnd();
    }
  }

  /**
   * Gera JSON atualizado (para debug)
   */
  async generateUpdatedJson(): Promise<object> {
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

// Integração com ambiente browser
if (typeof window !== 'undefined') {
  // Cria instância global
  window.autoDetector = new AutoImageDetector();
  
  console.log('AutoImageDetector TypeScript carregado e disponível globalmente');
  console.log('Categorias conhecidas:', window.autoDetector.knownCategories?.map((c: CategoryConfig) => c.name) || []);
  
  // Métodos de conveniência para desenvolvimento
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Modo desenvolvimento detectado');
    window.debugAutoDetector = () => window.autoDetector.debugAllImages();
    window.getDetectionStats = () => window.autoDetector.getDetectionStats();
  }
}

console.log('Auto Image Detector TypeScript carregado');
