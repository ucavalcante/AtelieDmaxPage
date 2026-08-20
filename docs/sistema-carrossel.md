# Sistema de Carrossel de Produtos - Ateliê Dmax

## 📋 Funcionalidades Implementadas

### ✅ **Sistema de Navegação por Cards**
- **Click em cards**: Ao clicar em qualquer card da galeria principal, o usuário é direcionado para a página de detalhes do produto
- **URLs semânticas**: `/src/content/products/details/{category-id}.html`
- **Navegação por teclado**: Suporte a Enter e Space para acessibilidade

### ✅ **Carrossel de Imagens Interativo**
- **Navegação lateral**: Botões de anterior/próximo
- **Thumbnails clicáveis**: Visualização rápida de todas as imagens
- **Indicadores visuais**: Dots que mostram a posição atual
- **Navegação por teclado**: Setas esquerda/direita para navegar, Escape para voltar

### ✅ **Sistema de Descrições JSON**
- **Descrições personalizadas**: Cada imagem pode ter sua própria descrição
- **Detalhes extras**: Lista de características específicas de cada produto
- **Fallback inteligente**: Descrições automáticas quando JSON não existe

### ✅ **Auto-detecção de Imagens**
- **Detecção automática**: Busca imagens na pasta da categoria
- **Fallback manual**: Sistema alternativo caso auto-detector falhe
- **Suporte a múltiplos formatos**: JPEG, JPG, PNG, WebP

## 🗂️ Estrutura de Arquivos

### **Páginas de Produto**
```
src/content/products/details/
├── enxoval-bebe.html          ✅ Implementado
├── sapato-infantil.html       ✅ Implementado  
├── batizado.html              ✅ Atualizado
├── caixa-convite.html         ✅ Atualizado
├── ocasioes-especiais.html    ✅ Atualizado
└── depoimentos.html           ✅ Implementado
```

### **Descrições de Imagens (Centralizado)**
```
data/descriptions/
├── enxoval-bebe.json          ✅ Implementado
├── sapato-infantil.json       ✅ Implementado  
├── batizado.json              ✅ Implementado
├── caixa-convite.json         ✅ Implementado
├── ocasioes-especiais.json    ✅ Implementado
└── depoimentos.json           ✅ Implementado
```

## 📝 Como Criar Descrições para Imagens

### **Localização dos arquivos**
```
data/descriptions/{category-id}.json
```

### **Formato do arquivo `{category-id}.json`**
```json
{
  "img001": {
    "description": "Descrição principal da imagem",
    "details": [
      "Detalhe 1",
      "Detalhe 2", 
      "Detalhe 3"
    ]
  },
  "img002": {
    "description": "Outra descrição...",
    "details": [
      "Característica A",
      "Característica B"
    ]
  }
}
```

### **Exemplo Real - Enxoval de Bebê**
```
Arquivo: data/descriptions/enxoval-bebe.json
```
```json
{
  "img001": {
    "description": "Toalhas personalizadas com bordados de elefantinhos - Perfeitas para o enxoval do bebê",
    "details": [
      "Bordado eletrônico de alta qualidade",
      "Tecido 100% algodão",
      "Personalização com nome do bebê",
      "Disponível em várias cores"
    ]
  }
}
```

## 🔧 Controles do Carrossel

### **Mouse/Touch**
- **Click nas setas**: Navegar anterior/próximo
- **Click nos thumbnails**: Ir diretamente para uma imagem
- **Click nos indicadores**: Navegar por posição

### **Teclado**
- **Seta Esquerda**: Imagem anterior
- **Seta Direita**: Próxima imagem  
- **Escape**: Voltar para galeria principal
- **Tab**: Navegar entre controles

### **Acessibilidade**
- **Aria-labels**: Descrições para screen readers
- **Focus indicators**: Destaque visual para navegação por teclado
- **Alt text**: Descrições alternativas para imagens
- **Títulos**: Tooltips informativos

## 🎯 Como Adicionar Nova Categoria

### **1. Atualizar `data/products.json`**
```json
{
  "id": "nova-categoria",
  "name": "Nome da Categoria",
  "description": "Descrição da categoria",
  "folder": "nova-categoria",
  "images": [],
  "keywords": ["palavra1", "palavra2"]
}
```

### **2. Criar pasta de imagens**
```bash
mkdir img/products/nova-categoria
```

### **3. Adicionar imagens**
```
img/products/nova-categoria/
├── img001.jpeg
├── img002.jpeg
└── ...
```

### **4. Criar arquivo de descrições** 
```bash
# data/descriptions/nova-categoria.json
{
  "img001": {
    "description": "Descrição da primeira imagem",
    "details": ["Detalhe 1", "Detalhe 2"]
  }
}
```

### **5. Criar página de detalhes**
```bash
# Copiar template
cp src/content/products/details/enxoval-bebe.html src/content/products/details/nova-categoria.html

# Atualizar título e meta description
```

## 🚀 Funcionalidades Técnicas

### **Vue.js 3 Composition API**
- **Reatividade**: Estado automático das imagens e navegação
- **Lifecycle hooks**: Carregamento automático de dados
- **Error handling**: Estados de loading e erro
- **Performance**: Lazy loading de imagens

### **Auto-detecção Inteligente**
- **JSON primeiro**: Tenta carregar do products.json
- **Fallback hardcoded**: Dados de backup se JSON falhar
- **Detecção de imagens**: Busca automática na pasta
- **Cache inteligente**: Evita recarregamentos desnecessários

### **Responsividade**
- **Mobile-first**: Design otimizado para touch
- **Breakpoints**: Adaptação para tablet e desktop
- **Touch gestures**: Suporte a gestos nativos
- **Performance**: Otimizações específicas por dispositivo

## 📈 Próximos Passos

### **Para Completar Implementação**
1. ✅ **Ordem das categorias definida**
2. ✅ **Sistema de carrossel funcionando**
3. ✅ **Navegação por cards implementada**
4. ✅ **Descrições centralizadas em data/descriptions/**
5. ✅ **Arquivos JSON criados para todas as categorias**
6. ✅ **Atualizar páginas restantes** (batizado, caixa-convite, ocasioes-especiais, sapato-infantil, depoimentos, enxoval)
7. ✅ **Testar navegação completa com Playwright E2E** (108/108 testes aprovados)
8. ✅ **Gerador de manifesto automatizado** (`scripts/generate-manifest.js`)

### **Melhorias Futuras**
- **Zoom de imagens**: Visualização em tela cheia
- **Compartilhamento**: Botões para redes sociais  
- **Favoritos**: Sistema de produtos favoritos
- **Busca**: Filtro por palavras-chave
- **Comentários**: Sistema de avaliações

## 🎨 Ordem Final das Categorias

1. **Enxoval de Bebê** ✅
2. **Sapato Infantil Customizado** ✅  
3. **Batizado** ✅
4. **Caixa Convite** ✅
5. **Ocasiões Especiais** ✅
6. **Depoimentos** ✅

---

**Status**: Sistema 100% implementado, testado e validado! 🎉
**Versão**: 0.9.0 (Agosto 2026)
