import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

   constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  getCurrentUser(): any {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
}
}
