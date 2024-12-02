// unauthorized.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <div class="row min-vh-100 justify-content-center align-items-center">
        <div class="col-md-6 text-center">
          <h1 class="text-danger mb-4">Unauthorized</h1>
          <p class="lead mb-4">You need to login to access this page.</p>
          <button 
            class="btn btn-primary" 
            [routerLink]="['/login']">
            Login
          </button>
        </div>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {}