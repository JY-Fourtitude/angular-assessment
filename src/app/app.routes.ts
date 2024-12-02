// import { Routes } from '@angular/router';
// import { authGuard } from './core/guards/auth.guard';
// import { HomeComponent } from '../app/features/default-page/home.component';
// import { LoginComponent } from '../app/features/auth/login/login.component';
// import { ForgotPassword } from '../app/features/auth/forgot-password/forgot-password.component';
// import { Dashboard } from './features/dashboard/dashboard.component';

// export const routes: Routes = [
//   // Public routes
//   { 
//     path: '', 
//     component: HomeComponent 
//   },
//   { 
//     path: 'login', 
//     component: LoginComponent 
//   },
//   { 
//     path: 'forgot-password', 
//     component: ForgotPassword 
//   },
  
//   // Protected routes with Dashboard layout
//   {
//     path: 'dashboard',
//     component: Dashboard,  // This will be the layout wrapper
//     canActivate: [authGuard],
//     children: [
//       {
//         path: 'profile',
//         loadComponent: () => import('../app/features/profile/profile.component')
//           .then(m => m.ProfileComponent)
//       },
//       {
//         path: 'products',
//         loadComponent: () => import('../app/features/products/product-list/product-list.component')
//           .then(m => m.ProductListComponent)
//       },
//       // Uncomment and add other protected routes
//       // {
//       //   path: 'products/:id',
//       //   loadComponent: () => import('./features/products/product-detail/product-detail.component')
//       //     .then(m => m.ProductDetailComponent)
//       // }
//     ]
//   },

//   // Unauthorized route
//   // {
//   //   path: 'unauthorized',
//   //   loadComponent: () => import('./features/unauthorized/unauthorized.component')
//   //     .then(m => m.UnauthorizedComponent)
//   // },

//   // Wildcard route for 404
//   { 
//     path: '**', 
//     redirectTo: '' 
//   }
// ];

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from '../app/features/default-page/home.component';
import { LoginComponent } from '../app/features/auth/login/login.component';
import { ForgotPassword } from '../app/features/auth/forgot-password/forgot-password.component';
import { UnauthorizedComponent } from './features/unauthorized/unauthorized.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component')
          .then(m => m.ProfileComponent),
        canActivate: [authGuard]
      },
      {
        path: 'change-password',
        loadComponent: () => import('../app/features/change-password/change-password.component')
          .then(m => m.ChangePasswordComponent),
        canActivate: [authGuard]
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/product.component')
          .then(m => m.ProductComponent),
        canActivate: [authGuard]
      }
    ]
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'forgot-password', 
    component: ForgotPassword 
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];