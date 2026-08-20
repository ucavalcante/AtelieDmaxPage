import { test, expect } from '@playwright/test';

const pagesToAudit = [
  { name: 'Home (index.html)', url: '/index.html' },
  { name: 'Sobre Nós (about.html)', url: '/src/content/about/about.html' },
  { name: 'Galeria Principal (products.html)', url: '/src/content/products/products.html' },
  { name: 'Detalhe: Batizado', url: '/src/content/products/details/batizado.html' },
  { name: 'Detalhe: Caixa Convite', url: '/src/content/products/details/caixa-convite.html' },
  { name: 'Detalhe: Depoimentos', url: '/src/content/products/details/depoimentos.html' },
  { name: 'Detalhe: Enxoval de Bebê', url: '/src/content/products/details/enxoval-bebe.html' },
  { name: 'Detalhe: Ocasiões Especiais', url: '/src/content/products/details/ocasioes-especiais.html' },
  { name: 'Detalhe: Sapato Infantil', url: '/src/content/products/details/sapato-infantil.html' },
];

test.describe('Jornada 4 — Auditoria de Saúde de Rede e Console (Zero Erros 404/403/Console)', () => {
  for (const target of pagesToAudit) {
    test(`deve carregar ${target.name} com 0 erros de rede e 0 exceções no console`, async ({ page, baseURL }) => {
      const failedRequests: { url: string; status: number }[] = [];
      const consoleErrors: string[] = [];

      // Monitora respostas HTTP
      page.on('response', (response) => {
        const url = response.url();
        const status = response.status();

        // Ignora favicon, diretórios com auto-index desligado no nginx e analytics externos
        if (url.includes('favicon.ico') || url.includes('clarity.ms') || url.includes('api.github.com') || (url.endsWith('/') && status === 403)) {
          return;
        }

        if (status >= 400) {
          failedRequests.push({ url, status });
        }
      });

      // Monitora exceções não tratadas de JavaScript
      page.on('pageerror', (error) => {
        consoleErrors.push(error.message);
      });

      // Monitora chamadas a console.error
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          if (!text.includes('clarity') && !text.includes('favicon')) {
            consoleErrors.push(text);
          }
        }
      });

      await page.goto(target.url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000); // Aguarda carregamento assíncrono de imagens/Vue

      // Asserções de integridade
      expect(failedRequests, `Falhas de rede encontradas em ${target.url}: ${JSON.stringify(failedRequests, null, 2)}`).toHaveLength(0);
      expect(consoleErrors, `Erros de console encontrados em ${target.url}: ${JSON.stringify(consoleErrors, null, 2)}`).toHaveLength(0);
    });
  }
});
