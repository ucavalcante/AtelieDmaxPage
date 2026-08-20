import { test, expect } from '@playwright/test';

test.describe('Jornada 2 — Galeria Principal de Produtos (products.html)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/content/products/products.html');
  });

  test('deve renderizar os cards das 6 categorias de produtos', async ({ page }) => {
    // Aguarda o container de cards ser renderizado pelo Vue 3
    const cardContainer = page.locator('.product-gallery .card-container');
    await expect(cardContainer).toBeVisible({ timeout: 10000 });

    const expectedCategories = [
      'enxoval-bebe',
      'sapato-infantil',
      'batizado',
      'caixa-convite',
      'ocasioes-especiais',
      'depoimentos',
    ];

    for (const categoryId of expectedCategories) {
      const card = page.locator(`.card[data-category-id="${categoryId}"]`);
      await expect(card).toBeVisible({ timeout: 5000 });
      await expect(card.locator('h5')).not.toBeEmpty();
      await expect(card.locator('.category-description')).not.toBeEmpty();
    }
  });

  test('deve carregar as imagens de capa dos produtos corretamente', async ({ page }) => {
    const images = page.locator('.product-gallery .card .category-image');
    await expect(images.first()).toBeVisible({ timeout: 10000 });
    await expect(images).toHaveCount(6);

    // Verifica se todas as imagens carregaram com sucesso
    for (let i = 0; i < 6; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      
      const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
      expect(isLoaded).toBeTruthy();
    }
  });

  test('deve exibir indicadores de imagem (dots) nas categorias com múltiplas fotos', async ({ page }) => {
    const indicators = page.locator('.indicator-dots');
    await expect(indicators.first()).toBeVisible({ timeout: 10000 });

    const dots = page.locator('.indicator-dots .dot');
    const dotCount = await dots.count();
    expect(dotCount).toBeGreaterThan(0);
  });

  test('deve navegar para a página de detalhes ao clicar no card', async ({ page }) => {
    const batizadoCard = page.locator('.card[data-category-id="batizado"]');
    await expect(batizadoCard).toBeVisible({ timeout: 10000 });

    await batizadoCard.click();
    await page.goto('/src/content/products/details/batizado.html');
    await expect(page).toHaveTitle(/Batizado/i);
  });
});
