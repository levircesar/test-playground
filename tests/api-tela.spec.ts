import test, { expect } from "playwright/test";

// Função helper para aguardar carregamento completo da página
const waitForPageReady = async (page: any) => {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500); // Aguarda hidratação do React
};

test.describe('API + Tela - TODOs', () => {
  test('should add a new TODO', async ({ page }) => {
    await page.goto('/roadmap/api-tela');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Adicionar um novo TODO
    await page.getByTestId('pp:api-tela|input|new-todo').fill('Teste Playwright');
    await page.getByTestId('pp:api-tela|btn|add').click();

    // Verificar se o TODO foi adicionado
    await expect(page.getByText('Teste Playwright')).toBeVisible();
    await expect(page.getByTestId('pp:api-tela|stat|total')).toContainText('3'); // 2 iniciais + 1 novo
  });

  test('should toggle TODO completion', async ({ page }) => {
    await page.goto('/roadmap/api-tela');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Marcar primeiro TODO como concluído
    await page.getByTestId('pp:api-tela|checkbox|done#1').check();

    // Verificar se o TODO foi marcado como concluído
    await expect(page.getByTestId('pp:api-tela|stat|completed')).toContainText('1');
    await expect(page.getByTestId('pp:api-tela|stat|pending')).toContainText('1');
  });

  test('should delete a TODO', async ({ page }) => {
    await page.goto('/roadmap/api-tela');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Contar TODOs iniciais
    await expect(page.getByTestId('pp:api-tela|stat|total')).toContainText('2');

    // Excluir primeiro TODO
    await page.getByTestId('pp:api-tela|btn|delete#1').click();

    // Verificar se o TODO foi removido
    await expect(page.getByTestId('pp:api-tela|stat|total')).toContainText('1');
  });

  test('should clear completed TODOs', async ({ page }) => {
    await page.goto('/roadmap/api-tela');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Marcar um TODO como concluído
    await page.getByTestId('pp:api-tela|checkbox|done#2').check();

    // Limpar TODOs concluídos
    await page.getByTestId('pp:api-tela|btn|clear-completed').click();

    // Verificar se apenas os TODOs pendentes restaram
    await expect(page.getByTestId('pp:api-tela|stat|completed')).toContainText('0');
  });

  test('should clear all TODOs', async ({ page }) => {
    await page.goto('/roadmap/api-tela');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Verificar que há TODOs
    await expect(page.getByTestId('pp:api-tela|stat|total')).toContainText('2');

    // Limpar todos os TODOs
    await page.getByTestId('pp:api-tela|btn|clear-all').click();

    // Verificar que não há mais TODOs
    await expect(page.getByTestId('pp:api-tela|stat|total')).toContainText('0');
    await expect(page.getByTestId('pp:api-tela|alert|empty')).toBeVisible();
  });

  test('should sync with API', async ({ page }) => {
    await page.goto('/roadmap/api-tela');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Clicar no botão sincronizar
    await page.getByTestId('pp:api-tela|btn|sync').click();

    // Verificar se a sincronização foi realizada
    await expect(page.getByTestId('pp:api-tela|tag|status')).toBeVisible();
  });

  test('should persist TODOs in localStorage', async ({ page }) => {
    await page.goto('/roadmap/api-tela');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Adicionar um TODO
    await page.getByTestId('pp:api-tela|input|new-todo').fill('TODO Persistente');
    await page.getByTestId('pp:api-tela|btn|add').click();

    // Verificar se foi adicionado
    await expect(page.getByText('TODO Persistente')).toBeVisible();

    // Recarregar a página
    await page.reload();

    // Verificar se o TODO ainda está lá
    await expect(page.getByText('TODO Persistente')).toBeVisible();
  });

  test('should test XPath functionality', async ({ page }) => {
    await page.goto('/roadmap/api-tela');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Testar XPath para encontrar o input de novo TODO
    await page.getByTestId('pp:api-tela|xpath|input|expr').fill('//*[@data-testid="pp:api-tela|input|new-todo"]');
    await page.getByTestId('pp:api-tela|xpath|btn|testar').click();

    // Verificar resultado
    await expect(page.getByTestId('pp:api-tela|xpath|alert|resultado')).toContainText('1 elemento(s)');
  });

  test('should handle empty TODO input', async ({ page }) => {
    await page.goto('/roadmap/api-tela');
    
    // Aguardar carregamento completo da página
    await waitForPageReady(page);

    // Tentar adicionar TODO vazio
    await page.getByTestId('pp:api-tela|btn|add').click();

    // Verificar que não foi adicionado (contador não mudou)
    await expect(page.getByTestId('pp:api-tela|stat|total')).toContainText('2');
  });
});
