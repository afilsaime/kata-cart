export const getCartItemsCount = () => cy.get('[data-test=cart-items-count]');
export const getAppleFujiAddToCardButton = () => cy.get('.add-to-cart').eq(0);
export const getMuffinBatAddToCardButton = () => cy.get('.add-to-cart').eq(1);
export const getGoldschalgerAddToCardButton = () =>
  cy.get('.add-to-cart').eq(2);
