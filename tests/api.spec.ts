import test, { expect } from "playwright/test";

// Função helper para aguardar carregamento completo da página
const waitForPageReady = async (page: any) => {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500); // Aguarda hidratação do React
};

test.describe('API Tests', () => {
  test('should test ping API', async ({ page }) => {
    await page.goto('/roadmap/api');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Fazer ping
    await page.getByTestId('pp:api|btn|ping').click();

    // Verificar resposta
    await expect(page.getByTestId('pp:api|response|ping')).toBeVisible();
    await expect(page.getByTestId('pp:api|response|ping')).toContainText('ok');
    await expect(page.getByTestId('pp:api|response|ping')).toContainText('serverTimestamp');
  });

  test('should test echo API with text', async ({ page }) => {
    await page.goto('/roadmap/api');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Enviar texto simples
    await page.getByTestId('pp:api|input|echo').fill('Hello World');
    await page.getByTestId('pp:api|btn|echo').click();

    // Verificar resposta
    await expect(page.getByTestId('pp:api|response|echo')).toBeVisible();
    await expect(page.getByTestId('pp:api|response|echo')).toContainText('Hello World');
  });

  test('should test echo API with JSON', async ({ page }) => {
    await page.goto('/roadmap/api');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Enviar JSON
    await page.getByTestId('pp:api|input|echo').fill('{"nome": "João", "idade": 30}');
    await page.getByTestId('pp:api|btn|echo').click();

    // Verificar resposta
    await expect(page.getByTestId('pp:api|response|echo')).toBeVisible();
    await expect(page.getByTestId('pp:api|response|echo')).toContainText('João');
    await expect(page.getByTestId('pp:api|response|echo')).toContainText('30');
  });

  test('should verify API history is saved in localStorage', async ({ page }) => {
    await page.goto('/roadmap/api');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Fazer algumas chamadas de API
    await page.getByTestId('pp:api|btn|ping').click();
    await page.waitForSelector('[data-testid="pp:api|response|ping"]');

    await page.getByTestId('pp:api|input|echo').fill('Test message');
    await page.getByTestId('pp:api|btn|echo').click();
    await page.waitForSelector('[data-testid="pp:api|response|echo"]');

    // Verificar se o histórico aparece
    await expect(page.getByTestId('pp:api|list|historico')).toBeVisible();
    await expect(page.getByTestId('pp:api|stats|historico')).toContainText('Total de chamadas: 2');
  });

  test('should clear API responses', async ({ page }) => {
    await page.goto('/roadmap/api');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Fazer uma chamada
    await page.getByTestId('pp:api|btn|ping').click();
    await page.waitForSelector('[data-testid="pp:api|response|ping"]');

    // Verificar que a resposta está visível
    await expect(page.getByTestId('pp:api|response|ping')).toBeVisible();

    // Limpar respostas
    await page.getByTestId('pp:api|btn|clear-responses').click();

    // Verificar que a resposta foi limpa
    await expect(page.getByTestId('pp:api|response|ping')).not.toBeVisible();
  });

  test('should clear API history', async ({ page }) => {
    await page.goto('/roadmap/api');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Fazer uma chamada
    await page.getByTestId('pp:api|btn|ping').click();
    await page.waitForSelector('[data-testid="pp:api|response|ping"]');

    // Verificar que há histórico
    await expect(page.getByTestId('pp:api|stats|historico')).toContainText('Total de chamadas: 1');

    // Limpar histórico
    await page.getByTestId('pp:api|btn|clear-history').click();

    // Verificar que o histórico foi limpo
    await expect(page.getByTestId('pp:api|alert|empty-history')).toBeVisible();
  });

  test('should test XPath functionality', async ({ page }) => {
    await page.goto('/roadmap/api');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Testar XPath para encontrar o botão ping
    await page.getByTestId('pp:api|xpath|input|expr').fill('//*[@data-testid="pp:api|btn|ping"]');
    await page.getByTestId('pp:api|xpath|btn|testar').click();

    // Verificar resultado
    await expect(page.getByTestId('pp:api|xpath|alert|resultado')).toContainText('1 elemento(s)');
  });
});
