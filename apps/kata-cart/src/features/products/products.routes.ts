import { Route } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';

export const productsRoutes: Route[] = [
  { path: '', component: ProductsListComponent },
];
