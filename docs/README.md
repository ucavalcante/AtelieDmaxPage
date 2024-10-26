# Documentação - Ateliê Dmax

## 📋 Visão Geral

Site estático portfolio para o Ateliê Dmax, especializado em artesanato em MDF, bordados eletrônicos e produtos personalizados.

## 🏗️ Arquitetura

### Estrutura Principal
```
├── index.html              # Página principal
├── css/                    # Estilos globais
├── js/                     # JavaScript principal
├── src/content/            # Conteúdo das páginas
│   ├── products/           # Galeria de produtos
│   └── about/              # Página sobre
└── img/products/           # Imagens organizadas por categoria
```

### Sistema de Navegação
- **Container único:** Todo conteúdo carrega via `<object>` element
- **Header fixo:** Menu e logo sempre visíveis
- **Navegação JavaScript:** Troca conteúdo sem reload da página

## 🛠️ Funcionalidades

### Sistema de Detecção de Imagens
- **Auto-detecção:** Encontra imagens automaticamente nas pastas
- **Múltiplos padrões:** `img001.jpeg`, `imagem1.jpg`, `produto-1.png`
- **Fallback:** `placeholder.jpg` quando imagem não encontrada

### Galeria de Produtos
- **Vue.js:** Componentes reativos para cards
- **Categorias:** Enxoval bebê, Batizado, Caixa convite, Ocasiões especiais
- **Responsivo:** Layout adaptativo para todos dispositivos

### Página Sobre
- **Container integrado:** Mantém navegação visível
- **Design moderno:** Gradientes, animações CSS
- **CTAs funcionais:** Links diretos WhatsApp/Instagram

## 🎨 Design System

### Paleta de Cores
```css
--primary-purple: #8B4F9F;
--secondary-pink: #CF94C2;
--accent-magenta: #FC01CE;
--dark-purple: #5A2C6B;
```

### Tipografia
- **Headings:** ZT Gatha Semi Bold, Glametrix
- **Body:** Arial, Helvetica, sans-serif
- **Responsive:** clamp() para escalabilidade

### Breakpoints
- **Mobile:** até 800px
- **Laptop:** 801px - 1200px
- **Desktop:** 1201px+

## 📱 Responsividade

### Mobile-First
- Grid layouts adaptáveis
- Touch-friendly (44px mínimo)
- Menu hamburger funcional
- Imagens otimizadas

## ♿ Acessibilidade

### WCAG 2.1 AA
- **Contraste:** 4.5:1 mínimo
- **Aria-labels:** Elementos interativos
- **Alt text:** Todas as imagens
- **Navegação teclado:** Tab order lógico
- **Screen readers:** Estrutura semântica

## 🚀 Performance

### Otimizações
- **Preload:** Recursos críticos (CSS, fontes)
- **Lazy loading:** Imagens não críticas
- **Minificação:** CSS/JS para produção
- **Cache:** Headers apropriados

### Core Web Vitals
- **LCP:** < 2.5s (otimizado)
- **FID:** < 100ms (JavaScript otimizado)
- **CLS:** < 0.1 (layout estável)

## 🔍 SEO

### Meta Tags
- **Title/Description:** Otimizados por página
- **Open Graph:** Compartilhamento redes sociais
- **Schema.org:** LocalBusiness markup
- **Canonical:** URLs consistentes

### Estrutura
- **H1-H6:** Hierarquia semântica
- **Sitemap.xml:** Indexação completa
- **Robots.txt:** Diretrizes crawlers

## 📊 Analytics

### Microsoft Clarity
- **Heatmaps:** Comportamento usuário
- **Session recordings:** Experiência real
- **Events:** Navegação e conversões

## 🛡️ Compatibilidade

### Tecnologias
- **HTML5/CSS3/ES6+:** Padrões modernos
- **Vue.js 2.6.14:** Framework reativo
- **Font Awesome 6.5.1:** Ícones
- **GitHub Pages:** Hospedagem estática

### Navegadores
- Chrome/Firefox/Safari/Edge (últimas 2 versões)
- Mobile: iOS Safari, Chrome Android

## 🔧 Desenvolvimento

### Adicionando Imagens
1. Coloque na pasta: `img/products/{categoria}/`
2. Use padrão: `img###.jpeg` ou similar
3. Sistema detecta automaticamente

### Adicionando Categoria
1. Crie pasta em `img/products/nova-categoria/`
2. Adicione entrada em `data/products.json`
3. Sistema carrega automaticamente

### Modificando Conteúdo
- **Produtos:** `src/content/products/products.html`
- **Sobre:** `src/content/about/about.html`
- **Estilos:** Arquivos CSS correspondentes

## 📞 Contato

### Links Funcionais
- **WhatsApp:** +55 11 98338-7957
- **Instagram:** @ateliedmax
- **Localização:** Indaiatuba/SP
