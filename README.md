# 🎨 Ateliê Dmax - Portfolio Artesanal

Um site portfolio moderno para apresentar os trabalhos artesanais do Ateliê Dmax, especializado em MDF, costura e bordados eletrônicos.

## 🚀 Tecnologias

- **Frontend**: Vue 3 + TypeScript + HTML5/CSS3
- **Build**: TypeScript → JavaScript (ES2018)
- **Hosting**: GitHub Pages (static site)
- **CDN**: Vue 3 via unpkg

## ✨ Funcionalidades

### 🖼️ Galeria de Produtos
- **Auto-detecção de imagens**: Sistema 100% automático
- **Rotação dinâmica**: Imagens mudam a cada 5-10 segundos
- **Transições suaves**: Efeito fade entre imagens
- **Responsividade**: Adapta-se a todos os dispositivos

### 🎭 Tecnologia Vue 3
- **Composition API**: Arquitetura moderna e reativa
- **TypeScript**: Type safety e melhor DX
- **Performance**: Otimizações do Vue 3

### 📱 UI/UX
- **Design responsivo**: Mobile-first approach
- **Acessibilidade**: WCAG 2.1 AA compliant
- **SEO**: Meta tags e structured data
- **Loading**: Lazy loading e performance otimizada

## 🏗️ Estrutura do Projeto

```
├── ts/                     # TypeScript sources
│   ├── product-gallery-vue3.ts  # Componente principal Vue 3
│   ├── auto-image-detector.ts   # Auto-detecção de imagens
│   └── vue-types.d.ts           # Tipos Vue 3
├── js/                     # JavaScript compilado (produção)
├── src/content/            # Conteúdo do site
├── img/products/           # Imagens dos produtos
├── css/                    # Estilos
└── docs/                   # Documentação

```