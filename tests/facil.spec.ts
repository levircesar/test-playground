import { test, expect } from '@playwright/test';

test.describe('Roadmap Fácil', () => {
  test('should interact with counter button', async ({ page }) => {
    await page.goto('/roadmap/facil');

    // Verificar contador inicial
    await expect(page.getByText('Contador: 0')).toBeVisible();

    // Clicar no botão incrementar
    await page.getByTestId('pp:facil|btn|incrementar').click();

    // Verificar se o contador aumentou
    await expect(page.getByText('Contador: 1')).toBeVisible();

    // Clicar mais algumas vezes
    await page.getByTestId('pp:facil|btn|incrementar').click();
    await page.getByTestId('pp:facil|btn|incrementar').click();

    // Verificar contador final
    await expect(page.getByText('Contador: 3')).toBeVisible();
  });

  test('should interact with loading button', async ({ page }) => {
    await page.goto('/roadmap/facil');

    // Clicar no botão loading
    await page.getByTestId('pp:facil|btn|loading').click();

    // Verificar se o botão está em loading
    await expect(page.getByTestId('pp:facil|btn|loading')).toBeDisabled();

    // Aguardar o loading terminar
    await expect(page.getByTestId('pp:facil|btn|loading')).toBeEnabled({ timeout: 3000 });
  });

  test('should interact with modal', async ({ page }) => {
    await page.goto('/roadmap/facil');

    // Abrir modal
    await page.getByTestId('pp:facil|btn|modal').click();

    // Verificar se o modal está visível
    await expect(page.getByTestId('pp:facil|modal|root')).toBeVisible();
    await expect(page.getByTestId('pp:facil|modal|content')).toBeVisible();

    // Fechar modal
    await page.getByTestId('pp:facil|modal|btn|ok').click();

    // Verificar se o modal foi fechado
    await expect(page.getByTestId('pp:facil|modal|root')).not.toBeVisible();
  });

  test('should interact with form inputs', async ({ page }) => {
    await page.goto('/roadmap/facil');

    // Preencher input de texto
    await page.getByTestId('pp:facil|input|texto').fill('Teste de input');

    // Preencher input number
    await page.getByTestId('pp:facil|input|number').fill('42');

    // Selecionar opção no select
    await page.getByTestId('pp:facil|select|opcoes').click();
    await page.getByText('Opção 2').click();

    // Marcar checkbox
    await page.getByTestId('pp:facil|checkbox|opcao1').check();

    // Selecionar radio
    await page.getByTestId('pp:facil|radio|opcao2').check();
  });

  test('should interact with tabs', async ({ page }) => {
    await page.goto('/roadmap/facil');

    // Clicar na segunda tab
    await page.getByTestId('pp:facil|tab|2').click();

    // Verificar conteúdo da segunda tab
    await expect(page.getByText('Conteúdo da segunda tab')).toBeVisible();

    // Clicar na terceira tab
    await page.getByTestId('pp:facil|tab|3').click();

    // Verificar conteúdo da terceira tab
    await expect(page.getByText('Conteúdo da terceira tab')).toBeVisible();
  });

  test('should interact with collapse panels', async ({ page }) => {
    await page.goto('/roadmap/facil');

    // Expandir primeiro painel
    await page.getByTestId('pp:facil|panel|1').click();

    // Verificar conteúdo do painel
    await expect(page.getByText('Conteúdo do primeiro painel')).toBeVisible();

    // Expandir segundo painel
    await page.getByTestId('pp:facil|panel|2').click();

    // Verificar conteúdo do segundo painel
    await expect(page.getByText('Conteúdo do segundo painel')).toBeVisible();
  });

  test('should interact with table sorting', async ({ page }) => {
    await page.goto('/roadmap/facil');

    // Clicar no cabeçalho da coluna Nome para ordenar
    await page.getByRole('columnheader', { name: 'Nome' }).click();

    // Verificar se a tabela está ordenada (pode verificar pelos dados)
    await expect(page.getByTestId('pp:facil|table|dados')).toBeVisible();
  });

  test('should test XPath functionality', async ({ page }) => {
    await page.goto('/roadmap/facil');

    // Testar XPath para encontrar o botão incrementar
    await page.getByTestId('pp:facil|xpath|input|expr').fill('//*[@data-testid="pp:facil|btn|incrementar"]');
    await page.getByTestId('pp:facil|xpath|btn|testar').click();

    // Verificar resultado
    await expect(page.getByTestId('pp:facil|xpath|alert|resultado')).toContainText('1 elemento(s)');
  });

  test('should have back button and navigate back', async ({ page }) => {
    await page.goto('/roadmap/facil');

    // Verificar se há botão de voltar
    await expect(page.getByTestId('pp:facil|btn|voltar')).toBeVisible();

    // Clicar no botão de voltar
    await page.getByTestId('pp:facil|btn|voltar').click();

    // Verificar se voltou para home
    await expect(page).toHaveURL('/home');
  });
});
