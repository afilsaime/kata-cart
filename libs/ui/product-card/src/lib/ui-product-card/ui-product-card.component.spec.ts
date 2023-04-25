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
      },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
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
});
