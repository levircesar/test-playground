import { test, expect } from '@playwright/test';

test('Clicar no botão incrementar', async ({ page }) => {
  // Navegar para a página do roadmap fácil
  await page.goto('/roadmap/facil');
  
  // Verificar se a página carregou
  await expect(page.getByTestId('pp:facil|page|container|root')).toBeVisible();
  
  // Verificar contador inicial
  await expect(page.getByText('Contador: 0')).toBeVisible();
  
  // Clicar no botão incrementar
  await page.getByTestId('pp:facil|btn|incrementar').click();
  
  // Verificar se o contador aumentou
  await expect(page.getByText('Contador: 1')).toBeVisible();
  
  // Clicar mais uma vez
  await page.getByTestId('pp:facil|btn|incrementar').click();
  
  // Verificar se o contador aumentou novamente
  await expect(page.getByText('Contador: 2')).toBeVisible();
});
