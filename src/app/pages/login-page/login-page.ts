import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthCard } from '../../components/auth-card/auth-card';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, AuthCard],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  showPassword = false;
  submitting = false;

  private fb: FormBuilder = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  get error() {
    return this.auth.error();
  }

  async submit() {
    this.submitting = true;
    const res = await this.auth.signIn(this.form.value.email!, this.form.value.password!);
    this.submitting = false;

    if (res.ok) {
      await this.router.navigateByUrl('/admin');
    }
  }
}
