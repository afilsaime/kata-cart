import { MOCK_PRODUCTS } from '@kata-cart/mocks';
import {
  getBooksCategory,
  getCategoriesFilterDropdown,
  getCategoryOptions,
  getClearFilterButton,
  getProducts,
} from '../support/products.po';

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

  it('should display the products prices tax included', () => {
    const productPricesWithTaxes = [
      '4,62 €',
      '4,04 €',
      '10,21 €',
      '1,50 €',
      '3,81 €',
      '6,37 €',
      '9,10 €',
      '8,26 €',
      '6,85 €',
      '10,00 €',
      '18,88 €',
      '15,47 €',
      '13,04 €',
      '13,91 €',
      '11,53 €',
      '11,01 €',
      '88,33 €',
      '91,62 €',
    ];

    getProducts().each((productCard, index) => {
      cy.wrap(productCard)
        .contains(
          '[data-test=product-tax-included-price]',
          productPricesWithTaxes[index]
        )
        .should('be.visible');
    });
  });

  it('should filter the list of products', () => {
    getClearFilterButton().should('not.exist');
    getCategoriesFilterDropdown().click();
    getCategoryOptions().should('have.length', 5);
    getBooksCategory().click();
    getProducts().should('have.length', 4);
    getClearFilterButton().should('be.visible');
    getClearFilterButton().click();
    getProducts().should('have.length', 18);
  });
});
