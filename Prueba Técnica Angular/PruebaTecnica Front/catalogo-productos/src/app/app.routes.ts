import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

import { LoginComponent } from './auth/login/login.component';

import { ProductListComponent } from './products/list/product-list.component';
import { ProductCreateComponent } from './products/create/product-create.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [

      {
        path: 'products',
        component: ProductListComponent
      },

      {
        path: 'products/create',
        component: ProductCreateComponent
      },

      {
        path: 'products/edit/:id',
        component: ProductCreateComponent
      },

      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'products'
  }
];