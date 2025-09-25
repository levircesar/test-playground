const fs = require('fs');
const path = require('path');

const challenges = [
  {
    id: 1,
    title: {
      "pt-BR": "Clicar no botão incrementar",
      "en-US": "Click increment button",
      "fr-FR": "Cliquer sur le bouton d'incrémentation"
    },
    description: {
      "pt-BR": "Clique no botão incrementar e valide se o contador aumenta corretamente",
      "en-US": "Click the increment button and validate that the counter increases correctly",
      "fr-FR": "Cliquez sur le bouton d'incrémentation et validez que le compteur augmente correctement"
    },
    level: "easy",
    type: "ui",
    dataTestId: "pp:facil|btn|incrementar",
    expectedResult: {
      "pt-BR": "O contador deve incrementar de 0 para 1, 2, 3... a cada clique",
      "en-US": "The counter should increment from 0 to 1, 2, 3... with each click",
      "fr-FR": "Le compteur doit s'incrémenter de 0 à 1, 2, 3... à chaque clic"
    },
    playwrightSolution: `import { test, expect } from '@playwright/test';

test('Clicar no botão incrementar', async ({ page }) => {
  await page.goto('/roadmap/facil');
  await expect(page.getByTestId('pp:facil|page|container|root')).toBeVisible();
  await expect(page.getByText('Contador: 0')).toBeVisible();
  await page.getByTestId('pp:facil|btn|incrementar').click();
  await expect(page.getByText('Contador: 1')).toBeVisible();
  await page.getByTestId('pp:facil|btn|incrementar').click();
  await expect(page.getByText('Contador: 2')).toBeVisible();
});`,
    cypressSolution: `describe('Clicar no botão incrementar', () => {
  it('deve incrementar o contador ao clicar no botão', () => {
    cy.visit('/roadmap/facil');
    cy.get('[data-testid="pp:facil|page|container|root"]').should('be.visible');
    cy.contains('Contador: 0').should('be.visible');
    cy.get('[data-testid="pp:facil|btn|incrementar"]').click();
    cy.contains('Contador: 1').should('be.visible');
    cy.get('[data-testid="pp:facil|btn|incrementar"]').click();
    cy.contains('Contador: 2').should('be.visible');
  });
});`,
    route: "/roadmap/facil"
  },
  {
    id: 2,
    title: {
      "pt-BR": "Interagir com botão de loading",
      "en-US": "Interact with loading button",
      "fr-FR": "Interagir avec le bouton de chargement"
    },
    description: {
      "pt-BR": "Clique no botão loading e aguarde 2 segundos para ver o estado de carregamento",
      "en-US": "Click the loading button and wait 2 seconds to see the loading state",
      "fr-FR": "Cliquez sur le bouton de chargement et attendez 2 secondes pour voir l'état de chargement"
    },
    level: "easy",
    type: "ui",
    dataTestId: "pp:facil|btn|loading",
    expectedResult: {
      "pt-BR": "O botão deve mostrar estado de loading por 2 segundos",
      "en-US": "The button should show loading state for 2 seconds",
      "fr-FR": "Le bouton doit afficher l'état de chargement pendant 2 secondes"
    },
    playwrightSolution: `import { test, expect } from '@playwright/test';

test('Interagir com botão de loading', async ({ page }) => {
  await page.goto('/roadmap/facil');
  await expect(page.getByTestId('pp:facil|page|container|root')).toBeVisible();
  const loadingButton = page.getByTestId('pp:facil|btn|loading');
  await expect(loadingButton).toBeVisible();
  await expect(loadingButton).not.toHaveClass(/loading/);
  await loadingButton.click();
  await expect(loadingButton).toHaveClass(/loading/);
  await page.waitForTimeout(2500);
  await expect(loadingButton).not.toHaveClass(/loading/);
});`,
    cypressSolution: `describe('Interagir com botão de loading', () => {
  it('deve mostrar estado de loading por 2 segundos', () => {
    cy.visit('/roadmap/facil');
    cy.get('[data-testid="pp:facil|page|container|root"]').should('be.visible');
    cy.get('[data-testid="pp:facil|btn|loading"]')
      .should('be.visible')
      .should('not.have.class', 'ant-btn-loading');
    cy.get('[data-testid="pp:facil|btn|loading"]').click();
    cy.get('[data-testid="pp:facil|btn|loading"]')
      .should('have.class', 'ant-btn-loading');
    cy.wait(2500);
    cy.get('[data-testid="pp:facil|btn|loading"]')
      .should('not.have.class', 'ant-btn-loading');
  });
});`,
    route: "/roadmap/facil"
  }
];

// Gerar arquivo JSON
const jsonContent = JSON.stringify(challenges, null, 2);
const outputPath = path.join(__dirname, '..', 'data', 'challenges-firebase.json');

fs.writeFileSync(outputPath, jsonContent, 'utf8');
console.log('✅ Arquivo challenges-firebase.json gerado com sucesso!');
console.log(`📁 Localização: ${outputPath}`);
console.log(`📊 Total de desafios: ${challenges.length}`);
