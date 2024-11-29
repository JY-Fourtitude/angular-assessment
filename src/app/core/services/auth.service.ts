// import { Injectable, computed, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { environment } from '../../../environments/environment';
// import { User } from '../models/user.model';
// import { firstValueFrom } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private currentUserSig = signal<User | null>(
//     JSON.parse(localStorage.getItem('currentUser') || 'null')
//   );
  
//   public currentUser = computed(() => this.currentUserSig());

//   constructor(
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   get currentUserValue(): User | null {
//     return this.currentUserSig();
//   }

//   async login(username: string, password: string): Promise<void> {
//     try {
//       const user = await firstValueFrom(
//         this.http.post<User>(
//           `${environment.apiUrl}/auth/login`,
//           { username, password }
//         )
//       );

//       if (!user) {
//         throw new Error('No user data received');
//       }

//       localStorage.setItem('currentUser', JSON.stringify(user));
//       this.currentUserSig.set(user);
//       this.router.navigate(['/dashboard']);
//     } catch (error) {
//       throw new Error('Login failed');
//     }
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//     this.currentUserSig.set(null);
//     this.router.navigate(['/login']);
//   }

//   async forgotPassword(username: string): Promise<void> {
//     await firstValueFrom(
//       this.http.post(
//         `${environment.apiUrl}/auth/forgot-password`,
//         { username }
//       )
//     );
//   }

//   async changePassword(currentPassword: string, newPassword: string): Promise<void> {
//     await firstValueFrom(
//       this.http.post(
//         `${environment.apiUrl}/auth/change-password`,
//         { currentPassword, newPassword }
//       )
//     );
//   }
// }

import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { firstValueFrom } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );
  
  public currentUser = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  async login(username: string, password: string): Promise<void> {
    try {
      const user = await firstValueFrom(
        this.http.post<User>(
          `${environment.apiUrl}/auth/login`,
          { username, password }
        )
      );

      if (!user) {
        throw new Error('No user data received');
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  async forgotPassword(username: string): Promise<void> {
    await firstValueFrom(
      this.http.post(
        `${environment.apiUrl}/auth/forgot-password`,
        { username }
      )
    );
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await firstValueFrom(
      this.http.post(
        `${environment.apiUrl}/auth/change-password`,
        { currentPassword, newPassword }
      )
    );
  }
}