import { MOCK_PRODUCTS } from '@kata-cart/mocks';
import {
  getAppleFujiAddToCardButton,
  getCartItemsCount,
  getGoldschalgerAddToCardButton,
  getMuffinBatAddToCardButton,
} from '../support/cart.po';

describe('kata-cart products page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/server/api/products', MOCK_PRODUCTS);
    cy.visit('/products');
  });

  it('should add product to the cart', () => {
    getCartItemsCount().should('not.exist');
    getAppleFujiAddToCardButton().click();
    getCartItemsCount().should('have.text', 1);
    getAppleFujiAddToCardButton().click();
    getCartItemsCount().should('have.text', 2);
    getAppleFujiAddToCardButton().click();
    getCartItemsCount().should('have.text', 3);
    getMuffinBatAddToCardButton().click();
    getCartItemsCount().should('have.text', 4);
    getGoldschalgerAddToCardButton().click();
    getCartItemsCount().should('have.text', 5);
  });
});
