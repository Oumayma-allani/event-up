import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // 🔄 Mode actif : 'login' ou 'signup'
  mode: 'login' | 'signup' = 'login';
roles = ['ORGANISATEUR', 'PARTICIPANT'];
bubbles = Array.from({ length: 20 }, (_, i) => i);
passwordError = false;


  loginData = {
    email: '',
    password: ''
  };

 signupData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  role: { id: null }
};
  constructor(private http: HttpClient, private router: Router) {}

  switchMode(mode: 'login' | 'signup') {
    this.mode = mode;
  }

  // 🔐 Connexion
  onLogin() {
    this.http.post<any>('http://localhost:8080/api/users/login', {
      email: this.loginData.email,
      password: this.loginData.password
    }).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', user.role?.name);
        const role = user.role?.name;
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'ORGANISATEUR') {
          this.router.navigate(['/organisateur']);
        } else if (role === 'PARTICIPANT') {
          this.router.navigate(['/participant']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        alert('Email ou mot de passe incorrect');
      }
    });
  }

  // 🆕 Inscription
 onSignup() {
  console.log("SignupData envoyée :", this.signupData);
  
  this.http.post<any>('http://localhost:8080/api/users', this.signupData) 
    .subscribe({
      next: (user) => {
        console.log("Utilisateur créé :", user); 
        alert("Inscription réussie !");
        this.switchMode('login');
      },
      error: (err) => {
        console.error("Erreur backend :", err); 
        alert("Erreur lors de l'inscription.");
      }
    });
}
checkPasswordStrength() {
  const password = this.signupData.password;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  this.passwordError = !regex.test(password);
}
}
