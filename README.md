# 🎨 Ateliê Dmax — Website & Catálogo Interativo

Website moderno e catálogo interativo para apresentação dos produtos artesanais do **Ateliê Dmax**, especializado em artesanato em MDF, costura criativa e bordados eletrônicos personalizados.

---

## 🚀 Tecnologias e Arquitetura

* **Frontend:** [Vue.js 3](https://vuejs.org/) (Composition API) + [TypeScript](https://www.typescriptlang.org/)
* **Testes Automatizados:** [Playwright Test](https://playwright.dev/) (End-to-End em TypeScript)
* **Manifesto Automatizado:** Script Node.js (`scripts/generate-manifest.js`) que indexa imagens em tempo de build
* **Estilização:** CSS3 modular, Glassmorphism, FontAwesome 6 Free e tipografia personalizada
* **CI/CD & Hospedagem:** GitHub Actions + GitHub Pages com ambientes de Produção e Homologação (`/develop`)

---

## ✨ Funcionalidades Principais

### 🖼️ Catálogo de Produtos Dinâmico
* **Geração Automática de Manifesto:** As imagens adicionadas às pastas de produtos são indexadas dinamicamente durante o build no `data/products.json`.
* **Carrosséis Interativos:** Navegação por miniaturas (thumbnails), setas de controle e atalhos de teclado (`ArrowLeft`, `ArrowRight`, `Escape`).
* **Transições Suaves:** Efeito fade entre imagens e indicadores de progresso por pontos (dots).
* **Responsividade Completa:** Layout adaptável para Desktop, Tablets e dispositivos móveis (Mobile-First).

---

## 🧪 Testes Automatizados (Playwright E2E)

O projeto conta com uma suíte abrangente de testes End-to-End escrita em **TypeScript** utilizando o **Playwright Test**, validando todas as jornadas de usuário, compatibilidade de dispositivos e integridade técnica.

### 📋 As 4 Suítes de Teste

| Arquivo de Teste | Escopo e Validações |
|---|---|
| [`tests/01-navigation.spec.ts`](tests/01-navigation.spec.ts) | • Logo e cabeçalho principal<br>• Menu lateral/hamburger (Mobile e Desktop)<br>• Links de redes sociais (WhatsApp, Instagram, Shopee)<br>• Transição para "Sobre Nós" e retorno à galeria |
| [`tests/02-product-gallery.spec.ts`](tests/02-product-gallery.spec.ts) | • Renderização dos 6 cards das categorias no Vue 3<br>• Carregamento correto de imagens de capa<br>• Indicadores de rotação (dots)<br>• Navegação por clique nos cards |
| [`tests/03-product-detail.spec.ts`](tests/03-product-detail.spec.ts) | • Validação das 6 páginas de detalhes dos produtos<br>• Carrossel de fotos (botões Anterior/Próximo)<br>• Troca de imagem ao clicar nas miniaturas (thumbnails)<br>• Navegação por teclado (`ArrowLeft`, `ArrowRight`)<br>• Botão "Voltar à Galeria" e botões de contato |
| [`tests/04-network-health.spec.ts`](tests/04-network-health.spec.ts) | • Auditoria de rede em todas as 9 rotas da aplicação<br>• **Zero erros HTTP 404, 403 ou 500** em imagens, fontes e scripts<br>• **Zero exceções de JavaScript no Console** |

---

### 🏃 Como Executar os Testes

#### 1. Executar todos os testes no terminal (Modo Headless)
```bash
npm test
```

#### 2. Abrir a Interface Gráfica Interativa do Playwright (UI Mode)
Permite inspecionar o passo a passo, a linha do tempo e cada clique visualmente:
```bash
npm run test:ui
```

#### 3. Visualizar o Relatório HTML Detalhado
Gera e abre o relatório completo com capturas de tela e traces:
```bash
npm run test:report
```

#### 4. Executar os Testes contra o Ambiente Online (Staging/Develop)
Para rodar a bateria de testes diretamente contra o ambiente publicado no GitHub Pages:
```bash
BASE_URL=https://ateliedmax.com.br/develop npm test
```

---

## 🛠️ Comandos de Desenvolvimento

### Instalação de Dependências
```bash
npm install
```

### Build do Projeto
Executa o gerador de manifesto de fotos e compila os arquivos TypeScript para JavaScript de produção:
```bash
npm run build
```

### Modo de Desenvolvimento (Watch Mode)
```bash
npm run dev
```

---

## 🏗️ Estrutura do Projeto

```
AtelieDmaxPage/
├── ts/                               # Código-fonte TypeScript
│   ├── main.ts                       # Controlador principal e navegação SPA
│   ├── product-gallery.ts            # Componente da galeria principal (Vue 3)
│   ├── product-detail.ts             # Controlador das páginas de detalhes
│   └── auto-image-detector.ts        # Detector e resolvedor de imagens
├── js/                               # JavaScript compilado (produção)
├── scripts/
│   └── generate-manifest.js          # Gerador automático do data/products.json
├── data/
│   └── products.json                 # Manifesto centralizado de produtos e imagens
├── tests/                            # Suíte de testes Playwright E2E em TypeScript
│   ├── 01-navigation.spec.ts
│   ├── 02-product-gallery.spec.ts
│   ├── 03-product-detail.spec.ts
│   └── 04-network-health.spec.ts
├── playwright.config.ts              # Configuração oficial do Playwright
├── src/content/                      # Páginas e templates HTML
│   ├── about/                        # Página "Sobre Nós"
│   └── products/                     # Galeria e páginas de detalhes
├── img/products/                     # Imagens dos produtos organizadas por categoria
├── fonts/fontawesome-free-6.5.1-web/ # Assets locais do FontAwesome
└── css/                              # Folhas de estilo modularizadas
```

---

## 🌐 Ambientes e Publicação Contínua (CI/CD)

* **Produção:** `https://ateliedmax.com.br/` (Branch `master`)
* **Homologação / Staging:** `https://ateliedmax.com.br/develop/` (Branch `develop`)

A pipeline do GitHub Actions valida automaticamente a integridade do código, executa o build com geração de manifesto e publica os artefatos no GitHub Pages a cada push.

---

## 📜 Licença

Este projeto opera sob uma política de licenciamento mista:

* **Código-Fonte (Software):** Licenciado sob a [MIT License](LICENSE) — livre para estudo, aprendizado e desenvolvimento.
* **Fotografias, Desenhos e Marca:** © **Todos os Direitos Reservados a Ulises Cavalcante / Ateliê Dmax** — é estritamente proibido o uso, cópia, redistribuição ou exploração comercial das fotos de produtos, desenhos artesanais e identidade visual sem autorização prévia por escrito. Para detalhes, consulte o arquivo [`LICENSE`](LICENSE).