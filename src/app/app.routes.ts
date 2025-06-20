import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout';
import { ProductResolver } from './services/resolvers/product.resolver';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'about',
        component: About
      },
      {
        path: 'produit/:slug',
        loadComponent: () => import('./pages/produit/produit').then(m => m.Produit),
        resolve: { productData: ProductResolver }
      }
    ]
  }
];
