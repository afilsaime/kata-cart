import { MOCK_PRODUCTS_WITH_TAXES } from '@kata-cart/mocks';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCartItemComponent } from './ui-cart-item.component';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

describe('UiCartItemComponent', () => {
  let spectator: Spectator<UiCartItemComponent>;

  const createComponent = createComponentFactory({
    component: UiCartItemComponent,
    providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        cartItem: { product: MOCK_PRODUCTS_WITH_TAXES[1], quantity: 1 },
      },
    });
  });

  it('should emit on delete button click', () => {
    const deleteFromCartSpy = jest.spyOn(
      spectator.component.deleteFromCart,
      'emit'
    );
    spectator.click('[data-test="delete-button"]');

    expect(deleteFromCartSpy).toBeCalledTimes(1);
  });
});
