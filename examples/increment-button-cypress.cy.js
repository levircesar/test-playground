describe('Clicar no botão incrementar', () => {
  it('deve incrementar o contador ao clicar no botão', () => {
    // Navegar para a página do roadmap fácil
    cy.visit('/roadmap/facil');
    
    // Verificar se a página carregou
    cy.get('[data-testid="pp:facil|page|container|root"]').should('be.visible');
    
    // Verificar contador inicial
    cy.contains('Contador: 0').should('be.visible');
    
    // Clicar no botão incrementar
    cy.get('[data-testid="pp:facil|btn|incrementar"]').click();
    
    // Verificar se o contador aumentou
    cy.contains('Contador: 1').should('be.visible');
    
    // Clicar mais uma vez
    cy.get('[data-testid="pp:facil|btn|incrementar"]').click();
    
    // Verificar se o contador aumentou novamente
    cy.contains('Contador: 2').should('be.visible');
  });
});
