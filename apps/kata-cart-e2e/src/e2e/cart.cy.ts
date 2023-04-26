import { MOCK_PRODUCTS } from '@kata-cart/mocks';
import {
  getAppleFujiAddToCardButton,
  getCartItemsCount,
  getCartNames,
  getDeleteButtons,
  getGoldschalgerAddToCardButton,
  getMuffinBatAddToCardButton,
  getProductTaxIncludedPrices,
  getProductsPrices,
  getProductsQuantities,
  getProductsTaxes,
} from '../support/cart.po';
import { getCartPageLink } from '../support/app.po';

describe('kata-cart products page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/server/api/products', MOCK_PRODUCTS);
    cy.visit('/products');
  });

  it('should display a message when the cart is empty', () => {
    getCartPageLink().click();
    cy.get('section').should('have.text', 'Panier Vide');
  });

  it('should add products to the cart', () => {
    getCartItemsCount().should('not.exist');

    //Adding items to the cart
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

    getCartPageLink().click();

    //checking the added items
    const expectedNames = [
      'Apple - Fuji',
      'Muffin Batt - Carrot Spice',
      'Goldschalger',
    ];
    const expectedQuantities = ['3', '1', '1'];
    const expectedTaxes = ['0,25\u00a0€', '0,20\u00a0€', '0,50\u00a0€'];
    const expectedPrices = [
      'Prix Unitaire HT: 4,37\u00a0€',
      'Prix Unitaire HT: 3,84\u00a0€',
      'Prix Unitaire HT: 9,71\u00a0€',
    ];
    const expectedTaxIncludedPrices = [
      'Prix Unitaire TTC: 4,62\u00a0€',
      'Prix Unitaire TTC: 4,04\u00a0€',
      'Prix Unitaire TTC: 10,21\u00a0€',
    ];

    getCartNames().each((name, index) => {
      cy.wrap(name).should('have.text', expectedNames[index]);
    });

    getProductsQuantities().each((quantity, index) => {
      cy.wrap(quantity).should('have.text', expectedQuantities[index]);
    });

    getProductsTaxes().each((tax, index) => {
      cy.wrap(tax).should('have.text', expectedTaxes[index]);
    });

    getProductsPrices().each((price, index) => {
      cy.wrap(price).should('have.text', expectedPrices[index]);
    });

    getProductTaxIncludedPrices().each((price, index) => {
      cy.wrap(price).should('have.text', expectedTaxIncludedPrices[index]);
    });
  });

  it('should delete products when clicking on the buttons', () => {
    getAppleFujiAddToCardButton().click();
    getMuffinBatAddToCardButton().click();
    getGoldschalgerAddToCardButton().click();

    getCartPageLink().click();

    getCartNames().should('have.length', 3);

    //deleting the items
    getDeleteButtons().eq(0).click();
    getDeleteButtons().eq(0).click();
    getDeleteButtons().eq(0).click();

    cy.get('section').should('have.text', 'Panier Vide');
  });
});
