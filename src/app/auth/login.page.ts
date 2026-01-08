import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, ButtonModule],
  template: `
  <div style="
    min-height: 100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background: #0f172a; /* fondo oscuro */
    padding: 24px;
  ">
    <div style="
      width: 420px;
      background: white;  /* tarjeta clara */
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,.35);
    ">
      <h2 style="margin:0 0 16px 0; color:#111; text-align:center;">Login</h2>

      <div style="display:flex; flex-direction:column; gap:12px;">
        <input pInputText placeholder="Email" [(ngModel)]="email" />
        <input pInputText type="password" placeholder="Password" [(ngModel)]="password" />

        <button
          pButton
          label="Ingresar"
          icon="pi pi-sign-in"
          (click)="login()">
        </button>
      </div>

      <p style="margin-top:14px; font-size:12px; color:#555; text-align:center;">
        Demo: admin@test.com / 1234
      </p>
    </div>
  </div>
`
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    const email = this.email.trim();
    const pass = this.password.trim();

    if (email === 'admin@test.com' && pass === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/students']);
    } else {
      alert('Datos incorrectos');
    }
  }
}
