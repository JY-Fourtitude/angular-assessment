import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { firstValueFrom } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jsonServerUrl = 'http://localhost:3000'; // Your JSON server URL
  
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
      // Query the users endpoint to find matching username/password
      const users = await firstValueFrom(
        this.http.get<User[]>(`${this.jsonServerUrl}/users?username=${username}`)
      );

      const user = users[0];

      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }

      // Remove password from stored user data for security
      const { password: _, ...secureUser } = user;
      
      localStorage.setItem('currentUser', JSON.stringify(secureUser));
      this.currentUserSubject.next(secureUser);
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
    try {
      // Check if user exists
      const users = await firstValueFrom(
        this.http.get<User[]>(`${this.jsonServerUrl}/users?username=${username}`)
      );

      if (users.length === 0) {
        throw new Error('User not found');
      }

      // In a real application, this would send an email
      // For JSON server mock, we'll just simulate success
      return Promise.resolve();
    } catch (error) {
      throw new Error('Failed to process forgot password request');
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      const currentUser = this.currentUserValue;
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      // Get current user data from server
      const users = await firstValueFrom(
        this.http.get<User[]>(`${this.jsonServerUrl}/users?id=${currentUser.id}`)
      );

      const user = users[0];
      if (!user || user.password !== currentPassword) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      await firstValueFrom(
        this.http.patch(`${this.jsonServerUrl}/users/${user.id}`, {
          password: newPassword
        })
      );
    } catch (error) {
      throw new Error('Failed to change password');
    }
  }

  getCurrentUserId(): number | null {
    const user = this.currentUserSubject.value;
    return user ? user.id : null;
  }
}