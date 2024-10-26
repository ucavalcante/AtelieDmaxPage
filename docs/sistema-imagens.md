# Sistema de Imagens

## Estrutura de Pastas
```
img/products/
├── enxoval-bebe/
├── batizado/
├── caixa-convite/
├── ocasioes-especiais/
└── placeholder.jpg
```

## Configuração

### data/products.json
```json
{
  "categories": [
    {
      "id": "enxoval-bebe",
      "name": "Enxoval de Bebê",
      "description": "Enxovais personalizados...",
      "folder": "enxoval-bebe",
      "images": ["img014.jpeg", "img024.jpeg"],
      "keywords": ["enxoval", "bebê", "bordado"]
    }
  ]
}
```

## Comportamentos

### Carregamento
- **Lazy loading:** Imagens fora da viewport
- **Fallback:** placeholder.jpg para erros
- **Alt text:** Descrições acessíveis
- **Responsive:** Adaptação automática

### Performance
- **WebP:** Formato preferencial
- **Compressão:** Otimização automática
- **Cache:** Headers apropriados
- **Preload:** Imagens críticas

## Adicionando Imagens
1. Coloque na pasta da categoria
2. Adicione nome no JSON (se necessário)
3. Use nomenclatura consistente
4. Teste responsividade
   img/products/[categoria]/nova-imagem.jpg
   ```

2. **Atualize o arquivo `data/products.json`:**
   ```json
   {
     "id": "categoria",
     "images": [
       "imagem-existente.jpg",
       "nova-imagem.jpg"  // ← Adicione aqui
     ]
   }
   ```

3. **Pronto!** A imagem aparecerá automaticamente no site.

### Exemplo Prático
Para adicionar uma nova imagem de enxoval:

1. **Coloque a imagem:**
   ```
   img/products/enxoval-bebe/img025.jpeg
   ```

2. **Edite `data/products.json`:**
   ```json
   {
     "id": "enxoval-bebe",
     "name": "Enxoval de Bebê",
     "images": [
       "img014.jpeg",
       "img024.jpeg",
       "img025.jpeg"  // ← Nova imagem
     ]
   }
   ```

## 🛠️ Funcionalidades Técnicas

### TypeScript + Vue.js
- **Componente Vue.js** carrega imagens dinamicamente
- **TypeScript** fornece tipagem e melhor manutenibilidade
- **Sistema de fallback** para imagens não encontradas
- **Lazy loading** para melhor performance

### Recursos Implementados
- ✅ **Carregamento dinâmico** das imagens por categoria
- ✅ **Sistema de fallback** automático
- ✅ **Lazy loading** nativo do navegador
- ✅ **Responsividade** para todos os dispositivos
- ✅ **Acessibilidade** com ARIA labels e navegação por teclado
- ✅ **SEO** com alt text descritivo automático

### Estados da Interface
- **Loading**: Spinner durante carregamento
- **Erro**: Mensagem e botão de retry
- **Sucesso**: Galeria com imagens organizadas
- **Fallback**: Temas visuais quando sem imagens

## 📱 Responsividade

### Breakpoints
- **Mobile (≤ 480px)**: Cards compactos, 1 coluna
- **Tablet (481px - 800px)**: Cards médios, 2 colunas
- **Desktop (> 800px)**: Cards grandes, múltiplas colunas

### Otimizações Mobile
- Imagens otimizadas para toque
- Carregamento progressivo
- Interface touch-friendly

## 🔧 Arquivos do Sistema

### Core Files
- `js/product-gallery.js` - Componente Vue.js principal
- `ts/product-gallery.ts` - Código TypeScript source
- `data/products.json` - Configuração de categorias e imagens
- `js/image-detector.js` - Utilitários para gerenciamento

### CSS
- `src/content/products/products.css` - Estilos da galeria

## 🎨 Customização

### Adicionar Nova Categoria
1. **Crie a pasta:**
   ```
   img/products/nova-categoria/
   ```

2. **Adicione no JSON:**
   ```json
   {
     "id": "nova-categoria",
     "name": "Nova Categoria",
     "description": "Descrição da categoria",
     "folder": "nova-categoria",
     "images": ["imagem1.jpg", "imagem2.jpg"],
     "keywords": ["palavra1", "palavra2"]
   }
   ```

### Modificar Estilos
Edite `products.css` para personalizar:
- Cores dos cards
- Tamanhos e proporções
- Animações e transições
- Layout responsivo

## 🐛 Solução de Problemas

### Imagem não aparece
1. Verifique se o arquivo existe na pasta correta
2. Confirme o nome no `products.json`
3. Verifique permissões do arquivo
4. Veja o console do navegador para erros

### Performance lenta
1. Otimize imagens (use WebP quando possível)
2. Mantenha imagens ≤ 500KB
3. Limite a quantidade de imagens por categoria

### JavaScript não funciona
1. Verifique se Vue.js está carregando
2. Veja erros no console do navegador
3. Confirme se `products.json` é válido

## 📈 Próximas Melhorias

- [ ] **Auto-detecção** de imagens via API
- [ ] **Compressão automática** de imagens
- [ ] **Cache inteligente** do navegador
- [ ] **PWA** para funcionamento offline
- [ ] **Busca e filtros** avançados

---

**Última atualização:** 22 de junho de 2025
**Versão:** 1.0.0
