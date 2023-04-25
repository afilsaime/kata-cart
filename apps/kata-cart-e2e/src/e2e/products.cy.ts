import { getProducts } from '../support/products.po';

describe('kata-cart products page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/server/api/products', { fixture: 'products.json' });
    cy.visit('/products');
  });

  it('should display the list of products', () => {
    getProducts().should('have.length', 18);
  });
});
