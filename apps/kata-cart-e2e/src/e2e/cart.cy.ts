import { MOCK_PRODUCTS } from '@kata-cart/mocks';
import {
  getAppleFujiAddToCardButton,
  getAppleFujiQuantitySelect,
  getCartItemsCount,
  getCartNames,
  getDeleteButtons,
  getGoldschalgerAddToCardButton,
  getMuffinBatAddToCardButton,
  getProductTaxIncludedPrices,
  getProductsPrices,
  getProductsQuantities,
  getProductsTaxes,
  getTaxIncludedTotal,
  getTotalTaxes,
} from '../support/cart.po';
import { getCartPageLink } from '../support/app.po';

describe('kata-cart products page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/server/api/products', MOCK_PRODUCTS);
    cy.visit('/products');
  });

  it('should display a message on product that are out of stock', () => {
    cy.get('.action-panel')
      .eq(9)
      .within((panel) => {
        cy.wrap(panel).get('.out-of-stock').should('be.visible');
        cy.wrap(panel).get('.add-to-cart').should('have.class', 'disabled');
      });
  });

  it('should display a message when the cart is empty', () => {
    getCartPageLink().click();
    cy.get('section').should('have.text', 'Panier Vide');
  });

  it('should add products to the cart', () => {
    getCartItemsCount().should('not.exist');

    //Add item to the cart
    getAppleFujiAddToCardButton().click();
    getCartItemsCount().should('have.text', 1);

    //Set quantity to 2
    getAppleFujiQuantitySelect().within((select) => {
      cy.wrap(select).get('.dropdown-button').click();
      cy.wrap(select).get('.dropdown-option:nth-child(2)').click();
    });

    //Add 2 item to the cart
    getAppleFujiAddToCardButton().click();
    getCartItemsCount().should('have.text', 3);

    //Add 1 item to the cart
    getMuffinBatAddToCardButton().click();
    getCartItemsCount().should('have.text', 4);

    //Add 1 item to the cart
    getGoldschalgerAddToCardButton().click();
    getCartItemsCount().should('have.text', 5);

    //Click on cart page link
    getCartPageLink().click();

    //checking the cart items
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

    //check taxes and total price
    getTotalTaxes().should('have.text', '1,45\u00a0€');
    getTaxIncludedTotal().should('have.text', '28,11\u00a0€');
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
