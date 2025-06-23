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
        component: Home,
        data: { headerVariant: 'transparent' }
      },
      {
        path: 'about',
        component: About,
        data: { headerVariant: 'opaque' }
      },
      {
        path: 'produit/:slug',
        loadComponent: () => import('./pages/produit/produit').then(m => m.Produit),
        resolve: { productData: ProductResolver },
        data: { headerVariant: 'opaque' }
      }
    ]
  }
];