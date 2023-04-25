import {
  Spectator,
  SpectatorRouting,
  createRoutingFactory,
} from '@ngneat/spectator/jest';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: SpectatorRouting<AppComponent>;

  const createComponent = createRoutingFactory({ component: AppComponent });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should have the right title', () => {
    expect(spectator.query('[data-test=app-name]')?.textContent).toEqual(
      'Kata Panier'
    );
  });
});
