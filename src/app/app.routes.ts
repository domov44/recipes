import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout';

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
      }
    ]
  }
];
