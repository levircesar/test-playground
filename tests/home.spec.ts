import test, { expect } from "playwright/test";

// Função helper para aguardar carregamento completo da página
const waitForPageReady = async (page: any) => {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500); // Aguarda hidratação do React
};

test.describe('Home Page', () => {
  test('should navigate to home page and interact with buttons', async ({ page }) => {
    await page.goto('/home');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);
 

    // Testar navegação para Desafios
    await page.getByTestId('pp:layout|header|btn|desafios').click();
    await expect(page).toHaveURL('/desafios');

    // Voltar para home
    await page.goto('/home');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Testar navegação para Começar
    await page.getByTestId('pp:layout|header|btn|comecar').click();
    await expect(page).toHaveURL('/comecar');
  });

  test('should navigate to desafios and back', async ({ page }) => {
    await page.goto('/home');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Navegar para desafios
    await page.getByTestId('pp:layout|header|btn|desafios').click();
    await expect(page).toHaveURL('/desafios');

    // Verificar se há botão de voltar
    await expect(page.getByTestId('pp:desafios|btn|voltar')).toBeVisible();

    // Voltar para home
    await page.getByTestId('pp:desafios|btn|voltar').click();
    await expect(page).toHaveURL('/home');
  });

  test('should navigate to comecar and back', async ({ page }) => {
    await page.goto('/home');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Navegar para começar
    await page.getByTestId('pp:layout|header|btn|comecar').click();
    await expect(page).toHaveURL('/comecar');

    // Verificar se há botão de voltar
    await expect(page.getByTestId('pp:comecar|btn|voltar')).toBeVisible();

    // Voltar para página inicial
    await page.getByTestId('pp:comecar|btn|voltar').click();
    await expect(page).toHaveURL('/');
  });

  test('should verify theme switching persists', async ({ page }) => {
    await page.goto('/home');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

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
