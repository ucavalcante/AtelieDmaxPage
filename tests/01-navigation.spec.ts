import { test, expect } from '@playwright/test';

test.describe('Jornada 1 — Navegação Principal e Menus (index.html)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('deve carregar a página inicial com título e logo corretos', async ({ page }) => {
    await expect(page).toHaveTitle(/Ateliê Dmax/i);

    const logo = page.locator('header.header a.logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('Ateliê Dmax');
  });

  test('deve exibir o menu de navegação e os links externos válidos', async ({ page }) => {
    // Abre o menu lateral através do hamburger
    await page.locator('label.hamb').click();

    const instagramLink = page.locator('a[aria-label*="Instagram"]');
    const whatsappLink = page.locator('a[aria-label*="WhatsApp"]');
    const shopeeLink = page.locator('a[aria-label*="Shopee"]');
    const aboutLink = page.locator('a[aria-label*="Sobre nós"]');

    await expect(instagramLink).toHaveAttribute('href', /instagram\.com\/ateliedmax/);
    await expect(whatsappLink).toHaveAttribute('href', /api\.whatsapp\.com/);
    await expect(shopeeLink).toHaveAttribute('href', /shopee\.com\.br/);
    await expect(aboutLink).toBeVisible();
  });

  test('deve abrir e fechar o menu lateral ao alternar o checkbox', async ({ page }) => {
    const sideMenuCheckbox = page.locator('#side-menu');
    const hambLabel = page.locator('label.hamb');

    await expect(sideMenuCheckbox).not.toBeChecked();

    // Clica no hamburger para abrir
    await hambLabel.click();
    await expect(sideMenuCheckbox).toBeChecked();
    await expect(page.locator('body')).toHaveClass(/menu-open/);

    // Clica novamente para fechar
    await hambLabel.click();
    await expect(sideMenuCheckbox).not.toBeChecked();
    await expect(page.locator('body')).not.toHaveClass(/menu-open/);
  });

  test('deve carregar a página de produtos inicialmente no object', async ({ page }) => {
    const productObject = page.locator('#productObject');
    await expect(productObject).toBeVisible();
    await expect(productObject).toHaveAttribute('data', /products\.html/);
  });

  test('deve alternar para a página Sobre Nós e voltar para Produtos', async ({ page }) => {
    const productObject = page.locator('#productObject');

    // Abre o menu e navega para Sobre Nós
    await page.locator('label.hamb').click();
    const aboutLink = page.locator('a[aria-label*="Sobre nós"]');
    await aboutLink.click();
    await expect(productObject).toHaveAttribute('data', /about\.html/);

    // Clica no logo para voltar para Produtos
    const logo = page.locator('header.header a.logo');
    await logo.click();
    await expect(productObject).toHaveAttribute('data', /products\.html/);
  });
});
