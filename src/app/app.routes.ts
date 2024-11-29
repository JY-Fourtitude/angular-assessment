import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from '../app/features/default-page/home.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full'
  // },
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadComponent: () => import('../app/features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../app/features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('../app/features/profile/profile.component')
      .then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadComponent: () => import('../app/features/products/product-list/product-list.component')
      .then(m => m.ProductListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'change-password',
    loadComponent: () => import('../app/features/auth/change-password/change-password.component')
      .then(m => m.ChangePasswordComponent),

    canActivate: [authGuard]
  }
//   {
//     path: 'products/:id',
//     loadComponent: () => import('./features/products/product-detail/product-detail.component')
//       .then(m => m.ProductDetailComponent),
//     canActivate: [authGuard]
//   },
//   {
//     path: 'unauthorized',
//     loadComponent: () => import('./features/unauthorized/unauthorized.component')
//       .then(m => m.UnauthorizedComponent)
//   }
];



// import { Routes } from '@angular/router';

// export const routes: Routes = [];
