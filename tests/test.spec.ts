import { test, expect } from 'playwright/test';

test.only('Clicar no botão incrementar', async ({ page }) => {
    await page.goto('/roadmap/facil');
    await expect(page.getByTestId('pp:medio|page|container|root')).toBeVisible();
    await page.getByTestId('pp:medio|email|input').fill('invalid-email');
    await page.getByTestId('pp:medio|form|submit').click();
    await expect(page.getByText('Email inválido')).toBeVisible();
});