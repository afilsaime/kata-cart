import { MOCK_PRODUCTS } from '@kata-cart/mocks';
import { getProducts } from '../support/products.po';

describe('kata-cart products page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/server/api/products', MOCK_PRODUCTS);
    cy.visit('/products');
  });

  it('should display the list of products', () => {
    getProducts().should('have.length', 18);
    getProducts().each((productCard, index) => {
      //first index isn't displayed because there is no title
      const dataIndex = index + 1;

      cy.wrap(productCard)
        .find('[data-test=product-name]')
        .should('have.text', MOCK_PRODUCTS[dataIndex].productName);
      cy.wrap(productCard)
        .find('[data-test=product-category]')
        .should('have.text', MOCK_PRODUCTS[dataIndex].category);
    });
  });
});
