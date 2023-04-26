export const getProducts = () => cy.get('[data-test=product-card]');
export const getCategoriesFilterDropdown = () =>
  cy.get('[data-test="category-filter-dropdown"]');
export const getClearFilterButton = () =>
  cy.get('[data-test="clear-filter-button"]');
