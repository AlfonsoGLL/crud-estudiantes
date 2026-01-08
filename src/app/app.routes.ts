import { Routes } from '@angular/router';
import { LoginPage } from './auth/login.page';
import { StudentsPage } from './students/students.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'students', component: StudentsPage },
];
