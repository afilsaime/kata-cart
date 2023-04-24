import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'products',
    loadChildren: () =>
      import('../features/products/products.routes').then(
        (m) => m.productsRoutes
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../features/cart/cart.routes').then((m) => m.cartRoutes),
  },
  { path: '**', redirectTo: 'products' },
];
