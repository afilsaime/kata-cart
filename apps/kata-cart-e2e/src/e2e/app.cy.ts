import {
  getAppName,
  getCartPageLink,
  getProductsPageLink,
} from '../support/app.po';

describe('kata-cart', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the app name', () => {
    getAppName().should('have.text', 'Kata Panier');
  });

  it('should navigate to the cart page', () => {
    getCartPageLink().click();

    cy.location('pathname').should('match', /\/cart$/);
  });

  it('should navigate to the products page', () => {
    cy.visit('/cart');

    getProductsPageLink().click();

    cy.location('pathname').should('match', /\/products$/);
  });
});
