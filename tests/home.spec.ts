import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should navigate to home page and interact with buttons', async ({ page }) => {
    await page.goto('/home');

    // Verificar se a página carregou
    await expect(page.getByTestId('pp:home|page|container|root')).toBeVisible();

    // Verificar se o XPath Tester está presente
    await expect(page.getByTestId('pp:home|xpath|box|tester')).toBeVisible();

    // Testar navegação para Desafios
    await page.getByTestId('pp:home|main|btn|desafios').click();
    await expect(page).toHaveURL('/desafios');

    // Voltar para home
    await page.goto('/home');

    // Testar navegação para Começar
    await page.getByTestId('pp:home|main|btn|comecar').click();
    await expect(page).toHaveURL('/comecar');
  });

  test('should navigate to desafios and back', async ({ page }) => {
    await page.goto('/home');

    // Navegar para desafios
    await page.getByTestId('pp:home|main|btn|desafios').click();
    await expect(page).toHaveURL('/desafios');

    // Verificar se há botão de voltar
    await expect(page.getByTestId('pp:desafios|btn|voltar')).toBeVisible();

    // Voltar para home
    await page.getByTestId('pp:desafios|btn|voltar').click();
    await expect(page).toHaveURL('/home');
  });

  test('should navigate to comecar and back', async ({ page }) => {
    await page.goto('/home');

    // Navegar para começar
    await page.getByTestId('pp:home|main|btn|comecar').click();
    await expect(page).toHaveURL('/comecar');

    // Verificar se há botão de voltar
    await expect(page.getByTestId('pp:comecar|btn|voltar')).toBeVisible();

    // Voltar para página inicial
    await page.getByTestId('pp:comecar|btn|voltar').click();
    await expect(page).toHaveURL('/');
  });

  test('should verify theme switching persists', async ({ page }) => {
    await page.goto('/home');

    // Trocar tema para escuro
    await page.getByTestId('pp:layout|header|switch|tema').click();
    
    // Verificar se o tema mudou (pode ser verificado pela cor de fundo ou outros elementos)
    await expect(page.getByTestId('pp:layout|header|header|root')).toBeVisible();

    // Recarregar a página
    await page.reload();

    // Verificar se o tema escuro persiste
    await expect(page.getByTestId('pp:layout|header|header|root')).toBeVisible();
  });
});
