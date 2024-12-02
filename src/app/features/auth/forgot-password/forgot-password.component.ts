import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})

export class ForgotPassword {
  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;

    try {
      await this.authService.forgotPassword(this.f['username'].value);
      // Show success message or redirect
      alert('Password reset email has been sent.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorMessage = 'Failed to reset password. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}