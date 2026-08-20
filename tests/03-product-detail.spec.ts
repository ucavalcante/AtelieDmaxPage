import { test, expect } from '@playwright/test';

const categories = [
  { id: 'batizado', name: 'Batizado' },
  { id: 'caixa-convite', name: 'Caixa Convite' },
  { id: 'depoimentos', name: 'Depoimentos' },
  { id: 'enxoval-bebe', name: 'Enxoval de Bebê' },
  { id: 'ocasioes-especiais', name: 'Ocasiões Especiais' },
  { id: 'sapato-infantil', name: 'Sapato Infantil Customizado' },
];

test.describe('Jornada 3 — Páginas de Detalhes dos Produtos (details/*.html)', () => {
  for (const category of categories) {
    test.describe(`Detalhes: ${category.name} (${category.id})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/src/content/products/details/${category.id}.html`);
      });

      test('deve carregar os dados do produto e imagem principal', async ({ page }) => {
        const title = page.locator('h1.product-title');
        await expect(title).toBeVisible();
        await expect(title).toContainText(category.name.substring(0, 10));

        const mainImage = page.locator('img.main-image');
        await expect(mainImage).toBeVisible();

        await expect.poll(async () => {
          return await mainImage.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
        }, { timeout: 10000 }).toBe(true);
      });

      test('deve navegar pelo carrossel através dos botões Anterior e Próximo', async ({ page }) => {
        const nextBtn = page.locator('.nav-next');
        const prevBtn = page.locator('.nav-prev');

        const hasMultiple = await nextBtn.isVisible();
        if (hasMultiple) {
          const mainImage = page.locator('img.main-image');
          const initialSrc = await mainImage.getAttribute('src');

          // Avança para a próxima imagem
          await nextBtn.click();
          await page.waitForTimeout(300);
          const nextSrc = await mainImage.getAttribute('src');
          expect(nextSrc).not.toBe(initialSrc);

          // Volta para a imagem anterior
          await prevBtn.click();
          await page.waitForTimeout(300);
          const returnedSrc = await mainImage.getAttribute('src');
          expect(returnedSrc).toBe(initialSrc);
        }
      });

      test('deve alterar a imagem ao clicar nas miniaturas (thumbnails)', async ({ page }) => {
        const thumbnails = page.locator('.thumbnail');
        const count = await thumbnails.count();

        if (count > 1) {
          // Clica na 2ª miniatura
          await thumbnails.nth(1).click();
          await page.waitForTimeout(300);
          
          await expect(thumbnails.nth(1)).toHaveClass(/active/);
        }
      });

      test('deve permitir navegação por teclado (ArrowRight e ArrowLeft)', async ({ page }) => {
        const thumbnails = page.locator('.thumbnail');
        const count = await thumbnails.count();

        if (count > 1) {
          const mainImage = page.locator('img.main-image');
          const initialSrc = await mainImage.getAttribute('src');

          // Pressiona Seta para Direita
          await page.keyboard.press('ArrowRight');
          await page.waitForTimeout(300);
          const nextSrc = await mainImage.getAttribute('src');
          expect(nextSrc).not.toBe(initialSrc);

          // Pressiona Seta para Esquerda
          await page.keyboard.press('ArrowLeft');
          await page.waitForTimeout(300);
          const backSrc = await mainImage.getAttribute('src');
          expect(backSrc).toBe(initialSrc);
        }
      });

      test('deve exibir botões de contato com WhatsApp e Instagram válidos', async ({ page }) => {
        const whatsappBtn = page.locator('.cta-buttons a[href*="whatsapp"]');
        const instagramBtn = page.locator('.cta-buttons a[href*="instagram"]');

        await expect(whatsappBtn).toBeVisible();
        await expect(whatsappBtn).toHaveAttribute('href', /api\.whatsapp\.com.*551198338-7957/);

        await expect(instagramBtn).toBeVisible();
        await expect(instagramBtn).toHaveAttribute('href', /instagram\.com\/ateliedmax/);
      });

      test('deve exibir o botão Voltar à Galeria', async ({ page }) => {
        const backBtn = page.locator('button.btn-back');
        await expect(backBtn).toBeVisible();
      });
    });
  }
});
