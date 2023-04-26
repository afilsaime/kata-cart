import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { UiProductCardComponent } from './ui-product-card.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);

describe('UiProductCardComponent', () => {
  let spectator: Spectator<UiProductCardComponent>;

  const createComponent = createComponentFactory({
    component: UiProductCardComponent,
    providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        name: 'Product Name',
        category: 'Product Category',
        taxIncludedPrice: 3,
        stock: 2,
      },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.quantityOptions).toEqual(['1', '2']);
  });

  it('should set the name and the category', () => {
    expect(spectator.query('[data-test=product-name]')?.textContent).toEqual(
      'Product Name'
    );
    expect(
      spectator.query('[data-test=product-category]')?.textContent
    ).toEqual('Product Category');
  });

  it('should set the price', () => {
    expect(
      spectator.query('[data-test=product-tax-included-price]')?.textContent
    ).toMatch(/3,00\s€/);
  });

  it('should emit an addToCart event on add to card button click', () => {
    const addToCardSpy = jest.spyOn(spectator.component.addToCart, 'emit');
    spectator.click('.add-to-cart');

    expect(addToCardSpy).toBeCalledTimes(1);
    expect(addToCardSpy).toBeCalledWith(1);
  });

  it('should set the selected quantity', () => {
    spectator.triggerEventHandler(
      'kc-ui-dropdown-select',
      'optionSelected',
      '3'
    );

    expect(spectator.component.selectedQuantity).toEqual('3');
  });
});
