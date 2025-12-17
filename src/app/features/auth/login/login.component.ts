import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  
  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(['/todos']),
      error: (err) => alert('Login failed')
    });
  }

  loginWithPasskey() {
    const email = this.loginForm.value.email;
    this.authService.passkeyLogin(email).subscribe({
      next: () => this.router.navigate(['/todos']),
      error: () => alert('Passkey login failed')
    });
  }

}
