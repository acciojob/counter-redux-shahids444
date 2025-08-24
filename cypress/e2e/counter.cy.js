describe('Counter App', () => {
  it('increase count on clicking increment & decrease on clicking decrease', () => {
    cy.visit('/');

    // Initial count 0
    cy.contains('0');

    // Click increment
    cy.get('[data-testid="increment-btn"]').first().click();
    cy.contains('1');

    // Click decrement
    cy.get('[data-testid="decrement-btn"]').first().click();
    cy.contains('0');
  });
});
