import { MOCK_PRODUCTS } from '@kata-cart/mocks';
import { getProducts } from '../support/products.po';

describe('kata-cart products page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/server/api/products', MOCK_PRODUCTS);
    cy.visit('/products');
  });

  it('should display the list of products', () => {
    getProducts().should('have.length', 18);
  });
});
