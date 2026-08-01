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
  private knownCategories: CategoryConfig[];
  private categoriesLoaded: boolean = false;

  constructor() {
    const isDevelop = typeof window !== 'undefined' && window.location.pathname.includes('/develop');
    const prefix = isDevelop ? '/develop' : '';
    
    this.basePath = `${prefix}/img/products/`;
    
    // Fallback hardcoded - usado apenas se products.json falhar
    this.knownCategories = this.getDefaultCategories();
  }

  /**
   * Carrega categorias do products.json primeiro, fallback para hardcoded
   */
  public async loadCategoriesFromJson(): Promise<void> {
    if (this.categoriesLoaded) return;

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
   * Adaptador para compatibilidade com a página de detalhes do produto (product-detail.ts)
   */
  async detectImagesForCategory(folderName: string): Promise<DetectedCategory | null> {
    await this.loadCategoriesFromJson();
    
    const config = this.knownCategories.find(c => c.folder === folderName || c.folder === folderName.toLowerCase());
    const images = await this.detectImagesInCategory(folderName);
    
    if (images.length === 0) return null;

    return {
      id: folderName,
      name: config ? config.name : folderName,
      description: config ? config.description : '',
      folder: folderName,
      images: images,
      keywords: config ? config.keywords : []
    };
  }

  /**
   * Detecta imagens em uma categoria específica via Directory Listing ou GitHub API
   */
  async detectImagesInCategory(folderName: string): Promise<string[]> {
    console.log(`Analisando pasta: ${folderName}`);
    
    // Ler a lista real de arquivos via Directory Listing (local) ou GitHub API (online)
    const listedImages = await this.detectImagesFromDirectoryListing(folderName);
    if (listedImages.length > 0) {
      console.log(`✅ Directory Listing/API encontrou ${listedImages.length} imagens em ${folderName}`);
      return listedImages;
    }

    console.log(`Nenhuma imagem listada pela API/Diretório para ${folderName}`);
    return [];
  }

  /**
   * Lê a lista real de imagens enviando um fetch para a pasta (products.json, GitHub API ou Directory Index)
   */
  private async detectImagesFromDirectoryListing(folderName: string): Promise<string[]> {
    // 1. Tentar ler as imagens da categoria diretamente do manifesto products.json (carregado dinamicamente no build)
    const jsonCategory = this.knownCategories.find((c: any) => c.folder === folderName || c.folder === folderName.toLowerCase());
    if (jsonCategory && Array.isArray((jsonCategory as any).images) && (jsonCategory as any).images.length > 0) {
      console.log(`✅ products.json retornou ${(jsonCategory as any).images.length} imagens para ${folderName}`);
      return (jsonCategory as any).images;
    }

    // 2. Tentar obter via GitHub Contents API (para GitHub Pages online)
    const githubApiImages = await this.detectImagesFromGitHubAPI(folderName);
    if (githubApiImages.length > 0) {
      console.log(`✅ GitHub Contents API retornou ${githubApiImages.length} imagens para ${folderName}`);
      return githubApiImages;
    }

    // 2. Tentar obter via Directory Listing HTML (para servidor de dev local)
    const folderUrl = `${this.basePath}${folderName}/`;
    try {
      const response = await fetch(folderUrl);
      if (!response.ok) return [];
      
      const html = await response.text();
      // Extrair todos os links de imagens (.jpeg, .jpg, .png, .webp) da listagem de diretório
      const imgRegex = /href=["']([^"']+\.(?:jpeg|jpg|png|webp))["']/gi;
      const foundFiles: Set<string> = new Set();
      let match;
      
      while ((match = imgRegex.exec(html)) !== null) {
        const fullPath = match[1];
        const filename = fullPath.split('/').pop();
        if (filename && !filename.startsWith('.')) {
          foundFiles.add(filename);
        }
      }
      
      return Array.from(foundFiles);
    } catch (e) {
      console.warn(`Directory listing não disponível para ${folderName}:`, e);
      return [];
    }
  }

  /**
   * Consulta a API REST pública do GitHub em tempo real para obter arquivos da pasta
   */
  private async detectImagesFromGitHubAPI(folderName: string): Promise<string[]> {
    // Detectar a branch ativa a partir da URL (develop vs master)
    const isDevelop = window.location.pathname.includes('/develop');
    const ref = isDevelop ? 'develop' : 'master';
    const apiUrl = `https://api.github.com/repos/ucavalcante/AtelieDmaxPage/contents/img/products/${folderName}?ref=${ref}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) return [];
      
      const items = await response.json();
      if (!Array.isArray(items)) return [];

      const imageExtensions = ['.jpeg', '.jpg', '.png', '.webp'];
      return items
        .filter((item: any) => item.type === 'file' && imageExtensions.some(ext => item.name.toLowerCase().endsWith(ext)))
        .map((item: any) => item.name);
    } catch (e) {
      console.warn(`GitHub API indisponível para ${folderName}:`, e);
      return [];
    }
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
