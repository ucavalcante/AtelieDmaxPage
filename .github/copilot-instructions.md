# GitHub Copilot Instructions - Ateliê Dmax

## Contexto do Projeto
Este é um site portfolio para "Ateliê Dmax" - um negócio de artesanato especializado em MDF, costura e bordados eletrônicos. O site visa apresentar produtos de forma atrativa e facilitar o contato com clientes.

### 🚨 Restrições Técnicas Importantes
- **GitHub Pages:** Site estático hospedado no GitHub Pages
- **Sem backend:** Apenas HTML, CSS, JavaScript client-side
- **Tecnologias permitidas:** HTML5, CSS3, JavaScript (ES6+), Vue.js CDN
- **Limitações:** Sem processamento server-side, sem banco de dados
- **Soluções alternativas:** APIs externas, serviços third-party para formulários

## Diretrizes Gerais de Desenvolvimento

### 🎨 Design e Identidade Visual
- **Paleta de cores oficial:**
  - Primário: `#8B4F9F` (roxo)
  - Secundário: `#CF94C2` (rosa)
  - Accent: `#FC01CE` (magenta)
  - Neutro escuro: `#5A2C6B`
- **Tipografia:** Utilizar fontes customizadas do projeto (zt-gatha, glametrix, etc.)
- **Estilo:** Design feminino, elegante, artesanal, com foco em produtos handmade
- **Elementos visuais:** Preferir bordas arredondadas, sombras suaves, transições fluidas

### 📱 Responsividade
- **Mobile-first approach:** Sempre considerar dispositivos móveis primeiro
- **Breakpoints principais:**
  - Mobile: até 800px
  - Tablet: 801px - 1200px  
  - Desktop: 1201px - 1920px
  - Large Desktop: 1920px+
- **Toque/click targets:** Mínimo 44px para elementos interativos
- **Imagens:** Sempre otimizadas e responsivas com fallbacks

### 🔍 SEO (Search Engine Optimization)
- **Meta tags obrigatórios:**
  - Title descritivo com palavras-chave
  - Meta description única por página (150-160 caracteres)
  - Meta keywords relevantes
  - Open Graph para redes sociais
  - Schema.org markup quando aplicável
- **Palavras-chave foco:**
  - "artesanato em mdf"
  - "bordado eletrônico"
  - "enxoval de bebê"
  - "convites personalizados"
  - "ateliê artesanal"
- **URLs semânticas:** Usar estrutura clara e descritiva
- **Alt text:** Sempre descrever imagens de forma detalhada
- **Estrutura H1-H6:** Hierarquia semântica clara

### ♿ Acessibilidade (WCAG 2.1 AA)
- **Contraste:** Mínimo 4.5:1 para texto normal, 3:1 para texto grande
- **Navegação por teclado:** Tab order lógico
- **Screen readers:** Aria-labels, roles e landmarks apropriados
- **Foco visual:** Indicadores claros para elementos focados
- **Animações:** Respeitar prefers-reduced-motion

### 🚀 Performance
- **Core Web Vitals:** Otimizar LCP, FID, CLS
- **Imagens:** WebP quando possível, lazy loading
- **CSS/JS:** Minificação e compressão
- **Fonts:** Preload para fontes críticas
- **Caching:** Headers apropriados para assets estáticos

### 💼 Experiência do Usuário (UX)
- **Objetivos do usuário:**
  1. Visualizar produtos/portfólio
  2. Entrar em contato para orçamentos
  3. Conhecer mais sobre o ateliê
- **Jornada do cliente:** Descoberta → Interesse → Contato → Conversão
- **Feedback visual:** Estados hover, loading, success, error
- **Formulários:** Validação em tempo real, mensagens claras

## 📋 Plano de Ação - Implementação de Melhorias

### Fase 1: Fundação (Semana 1-2)
**Prioridade: ALTA**

#### 1.1 SEO Básico
- [x] Adicionar meta tags completos em todas as páginas
- [x] Implementar schema.org markup para negócio local
- [x] Criar sitemap.xml atualizado
- [x] Configurar robots.txt otimizado
- [ ] Adicionar alt text em todas as imagens

#### 1.2 Performance Crítica
- [ ] Otimizar imagens (WebP, compressão)
- [ ] Implementar lazy loading
- [ ] Minificar CSS/JS
- [x] Adicionar preload para fontes críticas

#### 1.3 Acessibilidade Básica
- [ ] Corrigir contraste de cores
- [ ] Adicionar aria-labels faltantes
- [ ] Melhorar navegação por teclado
- [ ] Testar com screen readers

### Fase 2: Funcionalidades Essenciais (Semana 3-4)
**Prioridade: ALTA**

#### 2.1 Links e Navegação
- [x] Implementar links funcionais para WhatsApp
- [x] Adicionar link para Instagram
- [x] Criar página "Sobre nós"
- [x] Implementar navegação interna

#### 2.2 Formulário de Contato
- [ ] Criar formulário de orçamento com serviços externos (Formspree, Netlify Forms, EmailJS)
- [ ] Implementar validação client-side apenas
- [ ] Adicionar feedback visual
- [ ] Configurar redirecionamento para WhatsApp como fallback

#### 2.3 Vue.js Enhancement (Client-side apenas)
- [x] Implementar componentes Vue para cards
- [x] Adicionar estado reativo para filtros (localStorage)
- [x] Criar carousel/galeria interativa
- [x] Implementar busca por produtos (dados estáticos JSON)

### Fase 3: Aprimoramentos (Semana 5-6)
**Prioridade: MÉDIA**

#### 3.1 Galeria Avançada
- [x] Páginas detalhadas para cada categoria
- [ ] Lightbox para visualização de imagens
- [x] Filtros por tipo de produto
- [x] Sistema de tags/categorias

#### 3.2 Conteúdo e SEO Avançado
- [ ] Blog/notícias sobre artesanato (páginas estáticas)
- [x] Depoimentos de clientes (dados JSON estáticos)
- [ ] FAQ sobre produtos/serviços (página estática)
- [x] Rich snippets para produtos (JSON-LD)

#### 3.3 Integração Social (Client-side)
- [ ] Feed do Instagram (API JavaScript ou widget embarcado)
- [ ] Botões de compartilhamento (URLs diretas)
- [ ] Reviews/avaliações (dados estáticos JSON)
- [x] Google Analytics 4 (gtag)

### Fase 4: Otimizações (Semana 7-8)
**Prioridade: BAIXA**

#### 4.1 Performance Avançada
- [ ] Service Worker para cache
- [ ] Code splitting
- [ ] Preload de rotas críticas
- [ ] Otimização de bundle size

#### 4.2 UX Avançada
- [ ] Animações micro-interações
- [ ] Progress indicators
- [ ] Skeleton loading
- [ ] Modo escuro/claro

#### 4.3 Analytics e Conversão
- [ ] Heatmaps (Hotjar/Clarity)
- [ ] Funil de conversão
- [ ] A/B testing
- [ ] Métricas de engajamento

## 🎯 Métricas de Sucesso

### Performance
- PageSpeed Insights: >90 (mobile e desktop)
- Core Web Vitals: Todos em "Good"
- Lighthouse Score: >95

### SEO
- Posicionamento top 3 para palavras-chave locais
- Featured snippets para "artesanato MDF [cidade]"
- 100+ páginas indexadas (incluindo produtos)

### UX/Conversão
- Taxa de conversão contato: >5%
- Tempo médio na página: >2min
- Taxa de rejeição: <40%

### Acessibilidade
- WAVE Web Accessibility: 0 erros
- Lighthouse Accessibility: 100
- Testes com usuários: Aprovação >90%

## 📝 Padrões de Código

### HTML
```html
<!-- Sempre incluir meta tags completos -->
<meta name="description" content="Descrição específica da página">
<meta property="og:title" content="Título para redes sociais">

<!-- Alt text descritivo -->
<img src="produto.jpg" alt="Enxoval de bebê bordado à mão com motivos florais">

<!-- Aria labels em elementos interativos -->
<button aria-label="Abrir galeria de produtos">Ver mais</button>
```

### CSS
```css
/* Usar variáveis CSS para cores */
:root {
  --primary-purple: #8B4F9F;
  --secondary-pink: #CF94C2;
}

/* Media queries mobile-first */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Transições suaves */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
```

### JavaScript/Vue
```javascript
// Componentes Vue organizados
Vue.component('product-card', {
  props: ['product'],
  template: `
    <div class="card" @click="openDetails">
      <img :src="product.image" :alt="product.description">
      <h3>{{ product.title }}</h3>
    </div>
  `
});
```

### 📝 Padrões de Escrita e Comentários
- **Emojis em código:** Não utilizar emojis em arquivos de código (HTML, CSS, JS) nem em comentários, exceto quando explicitamente solicitado
- **Comentários:** Usar linguagem clara e profissional em português
- **Documentação:** Emojis são permitidos apenas em arquivos de documentação (README.md, instruções, relatórios)
- **Consistência:** Manter padrão uniforme em todo o projeto

### ✅ Validação de Progresso
**IMPORTANTE:** Sempre verificar o plano de ação antes de implementar qualquer mudança:

1. **Antes de cada alteração:**
   - [ ] Verificar se a tarefa está no plano de ação atual
   - [ ] Confirmar que a solução é compatível com GitHub Pages
   - [ ] Validar que não requer processamento server-side

2. **Após cada implementação:**
   - [ ] Marcar item como concluído no plano
   - [ ] Testar funcionalidade em ambiente estático
   - [ ] Verificar se não quebrou outras funcionalidades
   - [ ] Documentar mudanças se necessário

3. **Restrições técnicas a sempre considerar:**
   - ❌ Sem Node.js/Python server-side
   - ❌ Sem banco de dados tradicional
   - ❌ Sem processamento de formulários back-end
   - ✅ Apenas JavaScript client-side
   - ✅ APIs externas via AJAX/Fetch
   - ✅ Dados estáticos (JSON, localStorage)
   - ✅ Serviços third-party (Formspree, EmailJS)

### 🔧 Ferramentas Recomendadas

### Desenvolvimento
- **Lighthouse:** Auditoria performance/SEO
- **WAVE:** Teste acessibilidade
- **PageSpeed Insights:** Performance real
- **Schema Markup Validator:** Validação structured data

### Design
- **Figma/Adobe XD:** Mockups responsivos
- **ColorContrast:** Verificação acessibilidade
- **TinyPNG:** Otimização de imagens

### SEO
- **Google Search Console:** Monitoramento indexação
- **SEMrush/Ahrefs:** Análise palavras-chave
- **Screaming Frog:** Auditoria técnica

## 🔄 Workflow de Desenvolvimento TypeScript → JavaScript

### 📝 Processo de Build
Este projeto usa **TypeScript como fonte de desenvolvimento** e **JavaScript como produção**:

#### **Estrutura de Arquivos:**
- **`/ts/`** - Código fonte TypeScript (desenvolvimento)
- **`/js/`** - Código JavaScript compilado (produção)
- **`/.ai-workspace/`** - Pasta de trabalho da IA (ignorada no Git)

#### **Comandos de Build:**
```bash
# Compilar TypeScript para JavaScript
npx tsc ts/product-gallery.ts --outDir js --target ES2018 --lib ES2018,DOM
npx tsc ts/auto-image-detector.ts --outDir js --target ES2018 --lib ES2018,DOM

# Build completo (todos os arquivos)
npx tsc ts/*.ts --outDir js --target ES2018 --lib ES2018,DOM

# Watch mode (desenvolvimento)
npx tsc ts/*.ts --outDir js --target ES2018 --lib ES2018,DOM --watch
```

#### **Workflow da IA:**
1. **Desenvolvimento:** Trabalhar nos arquivos `.ts` na pasta `/ts/`
2. **Testes:** Usar pasta `/.ai-workspace/` para arquivos temporários
3. **Build:** Compilar TS → JS antes de testar funcionalidades
4. **Produção:** Arquivos `.js` são servidos pelo site

#### **Arquivos TypeScript Principais:**
- **`ts/product-gallery.ts`** - Componente Vue da galeria de produtos
- **`ts/auto-image-detector.ts`** - Sistema de auto-detecção de imagens

#### **Vantagens do Workflow:**
- ✅ **Type Safety** durante desenvolvimento
- ✅ **IntelliSense** melhorado
- ✅ **Detecção precoce de erros**
- ✅ **Código mais limpo e documentado**
- ✅ **Compatibilidade** com GitHub Pages

### 🤖 Instruções para IA

#### **Pasta de Trabalho (.ai-workspace/):**
- Use `/.ai-workspace/` para arquivos temporários
- Arquivos nesta pasta **não são versionados** (estão no .gitignore)
- Ideal para:
  - Testes experimentais
  - Rascunhos de código
  - Backups temporários
  - Arquivos de debug

#### **Regras de Desenvolvimento:**
1. **Sempre trabalhar primeiro no TypeScript** (`/ts/`)
2. **Compilar para JavaScript** antes de testar
3. **Usar .ai-workspace** para arquivos temporários
4. **Documentar mudanças** significativas
5. **Manter sincronização** TS ↔ JS

#### **Comandos Úteis para IA:**
```bash
# Verificar arquivos TypeScript
npx tsc ts/*.ts --noEmit --strict

# Compilar e testar
npx tsc ts/*.ts --outDir js --target ES2018 --lib ES2018,DOM

# Verificar estrutura Clean Architecture
find ts/ -name "*.ts" -exec grep -l "interface\|class\|export" {} \;

# Validar dependências entre camadas
npx tsc ts/**/*.ts --noEmit --strict --noImplicitAny
```

---

*Última atualização: 22 de junho de 2025*
*Versão: 2.0*

## 🏗️ Clean Architecture para Web Estático

### 📐 Adaptação da Clean Architecture
Este projeto aplica os **princípios da Clean Architecture** adaptados para um ambiente web estático sem backend:

#### **Camadas da Arquitetura:**

```
┌─────────────────────────────────────────┐
│           PRESENTATION LAYER            │
│  (Vue Components, HTML Templates)       │
├─────────────────────────────────────────┤
│           APPLICATION LAYER             │
│  (Use Cases, Business Logic)            │
├─────────────────────────────────────────┤
│           DOMAIN LAYER                  │
│  (Entities, Interfaces, Types)          │
├─────────────────────────────────────────┤
│        INFRASTRUCTURE LAYER             │
│  (Data Access, External APIs)           │
└─────────────────────────────────────────┘
```

#### **Estrutura de Pastas Mapeada:**

**1. Domain Layer (`/ts/types/`, `/ts/interfaces/`)**
```typescript
// Entities - Objetos de negócio puros
interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
}

// Value Objects - Objetos imutáveis
interface ProductSettings {
  basePath: string;
  fallbackImage: string;
  lazyLoading: boolean;
}

// Domain Services - Regras de negócio puras
interface ImageValidator {
  validateFormat(url: string): boolean;
  validateSize(file: File): boolean;
}
```

**2. Application Layer (`/ts/services/`, `/ts/use-cases/`)**
```typescript
// Use Cases - Casos de uso da aplicação
class LoadProductGalleryUseCase {
  constructor(
    private repository: ProductRepository,
    private imageService: ImageService
  ) {}
  
  async execute(categoryId?: string): Promise<Product[]> {
    // Lógica do caso de uso
  }
}

// Application Services - Coordenação entre camadas
class ProductGalleryService {
  // Orquestração dos use cases
}
```

**3. Infrastructure Layer (`/ts/repositories/`, `/ts/adapters/`)**
```typescript
// Data Access - Acesso a dados (JSON, APIs)
class JsonProductRepository implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    // Fetch do JSON estático
  }
}

// External Services - Integração com APIs externas
class ImageDetectorAdapter {
  // Auto-detecção de imagens
}
```

**4. Presentation Layer (`/ts/components/`, `/ts/views/`)**
```typescript
// Vue Components - Interface do usuário
const ProductGalleryComponent = {
  // Componente Vue que usa os services
};
```

### 🎯 Princípios Aplicados

#### **1. Dependency Inversion**
```typescript
// Interface definida no Domain
interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
}

// Implementação na Infrastructure
class StaticJsonRepository implements ProductRepository {
  // Implementação específica para JSON estático
}

// Uso na Application
class ProductService {
  constructor(private repository: ProductRepository) {}
  // Service não conhece a implementação específica
}
```

#### **2. Single Responsibility**
```typescript
// ❌ Violação - tudo em um lugar
class ProductGallery {
  loadData() { /* fetch + parse + validate + render */ }
}

// ✅ Separação clara de responsabilidades
class ProductDataLoader { /* apenas carrega dados */ }
class ProductValidator { /* apenas valida */ }
class ProductRenderer { /* apenas renderiza */ }
```

#### **3. Open/Closed Principle**
```typescript
// Base abstrata
abstract class ImageProcessor {
  abstract process(url: string): Promise<string>;
}

// Extensões sem modificar o original
class WebPImageProcessor extends ImageProcessor { /* WebP logic */ }
class LazyImageProcessor extends ImageProcessor { /* Lazy loading logic */ }
```

### 📁 Estrutura de Arquivos Recomendada

#### **TypeScript Source (`/ts/`)**
```
ts/
├── domain/                 # Camada de Domínio
│   ├── entities/          # Entidades de negócio
│   │   ├── Product.ts
│   │   ├── Category.ts
│   │   └── Gallery.ts
│   ├── interfaces/        # Contratos/Interfaces
│   │   ├── repositories/
│   │   ├── services/
│   │   └── adapters/
│   └── value-objects/     # Objetos de valor
│       ├── ImageSettings.ts
│       └── AnimationConfig.ts
├── application/           # Camada de Aplicação
│   ├── use-cases/        # Casos de uso
│   │   ├── LoadProducts.ts
│   │   ├── FilterProducts.ts
│   │   └── DetectImages.ts
│   ├── services/         # Serviços de aplicação
│   │   ├── ProductService.ts
│   │   ├── ImageService.ts
│   │   └── ValidationService.ts
│   └── dto/              # Data Transfer Objects
│       └── ProductDTO.ts
├── infrastructure/       # Camada de Infraestrutura
│   ├── repositories/     # Implementações de repositórios
│   │   ├── JsonProductRepository.ts
│   │   └── LocalStorageRepository.ts
│   ├── adapters/         # Adaptadores externos
│   │   ├── ImageDetectorAdapter.ts
│   │   └── WhatsAppAdapter.ts
│   └── utils/            # Utilitários técnicos
│       ├── HttpClient.ts
│       └── Logger.ts
├── presentation/         # Camada de Apresentação
│   ├── components/       # Componentes Vue
│   │   ├── ProductGallery.ts
│   │   ├── ProductCard.ts
│   │   └── CategoryFilter.ts
│   ├── views/            # Views/Páginas
│   │   └── HomePage.ts
│   └── controllers/      # Controladores
│       └── GalleryController.ts
└── shared/               # Código compartilhado
    ├── types/            # Tipos globais
    ├── constants/        # Constantes
    └── errors/           # Classes de erro customizadas
```

### 🔧 Implementação Prática

#### **1. Domain Entities**
```typescript
// ts/domain/entities/Product.ts
export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly category: string,
    public readonly images: string[],
    public readonly keywords: string[]
  ) {
    this.validateProduct();
  }

  private validateProduct(): void {
    if (!this.id || !this.name) {
      throw new Error('Product must have id and name');
    }
  }

  hasImages(): boolean {
    return this.images.length > 0;
  }

  matchesKeyword(keyword: string): boolean {
    return this.keywords.some(k => 
      k.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
```

#### **2. Use Cases**
```typescript
// ts/application/use-cases/LoadProducts.ts
export class LoadProductsUseCase {
  constructor(
    private productRepository: ProductRepository,
    private imageDetector: ImageDetectorService
  ) {}

  async execute(options?: {
    category?: string;
    autoDetect?: boolean;
  }): Promise<Product[]> {
    let products = await this.productRepository.getProducts();
    
    if (options?.category) {
      products = products.filter(p => p.category === options.category);
    }
    
    if (options?.autoDetect) {
      products = await this.imageDetector.detectImagesForProducts(products);
    }
    
    return products;
  }
}
```

#### **3. Repository Implementation**
```typescript
// ts/infrastructure/repositories/JsonProductRepository.ts
export class JsonProductRepository implements ProductRepository {
  constructor(private httpClient: HttpClient) {}

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this.httpClient.get('/data/products.json');
      const data = response.categories;
      
      return data.map(category => new Product(
        category.id,
        category.name,
        category.id,
        category.images || [],
        category.keywords || []
      ));
    } catch (error) {
      throw new ProductLoadError('Failed to load products', error);
    }
  }
}
```

#### **4. Vue Component Integration**
```typescript
// ts/presentation/components/ProductGallery.ts
export const ProductGalleryComponent = {
  data() {
    return {
      products: [] as Product[],
      loading: false,
      error: null as string | null
    };
  },

  async created() {
    // Dependency Injection manual (simples para web estático)
    const httpClient = new HttpClient();
    const repository = new JsonProductRepository(httpClient);
    const imageDetector = new AutoImageDetectorService();
    const useCase = new LoadProductsUseCase(repository, imageDetector);
    
    await this.loadProducts(useCase);
  },

  methods: {
    async loadProducts(useCase: LoadProductsUseCase) {
      try {
        this.loading = true;
        this.products = await useCase.execute({ autoDetect: true });
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
```

### 🧪 Testabilidade

#### **Vantagens da Clean Architecture:**
- **Testabilidade:** Cada camada pode ser testada independentemente
- **Mocks simples:** Interfaces permitem mock fácil
- **Isolamento:** Lógica de negócio separada da infraestrutura

```typescript
// Exemplo de teste de Use Case
describe('LoadProductsUseCase', () => {
  let useCase: LoadProductsUseCase;
  let mockRepository: jest.Mocked<ProductRepository>;
  let mockImageDetector: jest.Mocked<ImageDetectorService>;

  beforeEach(() => {
    mockRepository = {
      getProducts: jest.fn()
    };
    mockImageDetector = {
      detectImagesForProducts: jest.fn()
    };
    
    useCase = new LoadProductsUseCase(mockRepository, mockImageDetector);
  });

  it('should load products successfully', async () => {
    // Test implementation
  });
});
```

### 🔄 Migration Strategy

#### **Fase 1: Estruturação**
1. Criar estrutura de pastas no `/ts/`
2. Mover interfaces existentes para `/ts/domain/interfaces/`
3. Extrair entidades dos componentes atuais

#### **Fase 2: Separação de Responsabilidades**
1. Extrair use cases dos componentes Vue
2. Criar repositories para dados JSON
3. Implementar adapters para APIs externas

#### **Fase 3: Dependency Injection Simples**
1. Criar factory functions para componentes
2. Implementar container DI manual (sem bibliotecas)
3. Configurar injeção nos componentes Vue

#### **Exemplo de Factory:**
```typescript
// ts/shared/factories/ComponentFactory.ts
export class ComponentFactory {
  static createProductGallery(): typeof ProductGalleryComponent {
    const httpClient = new HttpClient();
    const repository = new JsonProductRepository(httpClient);
    const imageDetector = new AutoImageDetectorService('/img/products/');
    const useCase = new LoadProductsUseCase(repository, imageDetector);
    
    return {
      ...ProductGalleryComponent,
      created() {
        this.loadProductsUseCase = useCase;
        return ProductGalleryComponent.created.call(this);
      }
    };
  }
}
```

### 📋 Benefícios para o Projeto

#### **Imediatos:**
- Código mais organizado e legível
- Facilita manutenção e evolução
- Melhor testabilidade
- Reduz acoplamento entre componentes

#### **Longo Prazo:**
- Facilita adição de novas funcionalidades
- Permite mudanças de infraestrutura sem afetar lógica
- Melhora documentação automática via interfaces
- Prepara para possível migração para SPA framework

### 🚨 Adaptações para GitHub Pages

#### **Limitações Consideradas:**
- **Sem DI Container:** Usar factory pattern manual
- **Sem Build Complexo:** TypeScript simples → JavaScript
- **Dados Estáticos:** JSON files como "database"
- **APIs Limitadas:** Fetch API para recursos externos

#### **Soluções Implementadas:**
- Repository pattern para dados JSON
- Adapter pattern para APIs externas
- Service layer para lógica de negócio
- Component pattern para UI (Vue.js)

---
