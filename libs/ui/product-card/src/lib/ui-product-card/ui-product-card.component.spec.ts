import { UiProductCardComponent } from './ui-product-card.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

describe('UiProductCardComponent', () => {
  let spectator: Spectator<UiProductCardComponent>;

  const createComponent = createComponentFactory({
    component: UiProductCardComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        name: 'Product Name',
        category: 'Product Category',
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
});
