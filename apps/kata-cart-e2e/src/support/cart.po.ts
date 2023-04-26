export const getCartItemsCount = () => cy.get('[data-test=cart-items-count]');
export const getAppleFujiAddToCardButton = () => cy.get('.add-to-cart').eq(0);
export const getMuffinBatAddToCardButton = () => cy.get('.add-to-cart').eq(1);
export const getGoldschalgerAddToCardButton = () =>
  cy.get('.add-to-cart').eq(2);
export const getCartNames = () => cy.get('[data-test="product-name"]');
export const getProductsQuantities = () =>
  cy.get('[data-test="product-quantity"]');
export const getProductsTaxes = () => cy.get('[data-test="product-taxes"]');
export const getProductsPrices = () => cy.get('[data-test="product-price"]');
export const getProductTaxIncludedPrices = () =>
  cy.get('[data-test="product-tax-included-price"]');
export const getDeleteButtons = () => cy.get('[data-test="delete-button"]');
