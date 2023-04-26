export const getProducts = () => cy.get('[data-test=product-card]');
export const getCategoriesFilterDropdown = () => cy.get('.dropdown-button');
export const getCategoryOptions = () => cy.get('.dropdown-option');
export const getBooksCategory = () => cy.get('.dropdown-option:nth-child(3)');
export const getClearFilterButton = () =>
  cy.get('[data-test="clear-filter-button"]');
