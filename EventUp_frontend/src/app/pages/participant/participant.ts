import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participant',
  standalone: false,
  templateUrl: './participant.html',
  styleUrl: './participant.css'
})
export class Participant {
constructor(private authService: Auth, private router:Router) {}

logout(): void {
  this.authService.logout();
}
 ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    
  }
}
