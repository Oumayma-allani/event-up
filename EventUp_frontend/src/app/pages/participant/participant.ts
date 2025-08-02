import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { EventService } from '../../services/event';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-participant',
  standalone: false,
  templateUrl: './participant.html',
  styleUrl: './participant.css'
})
export class Participant implements OnInit{
  events: any[] = [];
  selectedEvent: any = null;
  currentUser: any = null;
favoriteEventIds: number[] = [];
userRegistrations: any[] = [];
 constructor(
    private eventService: EventService,
    private authService: Auth,
    private router: Router
  ) {}

logout(): void {
  this.authService.logout();
}
 ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.loadEvents();
this.currentUser = this.authService.getCurrentUser(); 
    console.log('👤 Utilisateur connecté :', this.currentUser);
      this.loadUserRegistrations();

  }
  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: data => this.events = data,
      error: err => console.error('Erreur chargement événements', err)
    });
  }

  showDetails(event: any): void {
    this.selectedEvent = event;
    const modal = new Modal(document.getElementById('eventDetailModal')!);
modal.show();
  }
  registerToEvent(eventId: number): void {
  const payload = {
    event: { id: eventId },
    participant: { id: this.currentUser.id },
    registrationDate: new Date().toISOString()
  };

  this.eventService.registerParticipant(payload).subscribe({
    next: () => {
      alert("Inscription réussie !");
      const modalEl = document.getElementById('eventDetailModal');
      if (modalEl) {
        const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      }
    },
    error: err => {
      console.error("❌ Erreur d'inscription", err);
      alert("❌ Une erreur est survenue, veuillez réessayer.");
    }
  });
}
scrollToEvents(): void {
  const element = document.getElementById('event-up');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
toggleFavorite(event: any): void {
  const index = this.favoriteEventIds.indexOf(event.id);
  if (index === -1) {
    this.favoriteEventIds.push(event.id);
  } else {
    this.favoriteEventIds.splice(index, 1);
  }
  console.log('❤️ Favoris actuels :', this.favoriteEventIds);
}

isFavorite(event: any): boolean {
  return this.favoriteEventIds.includes(event.id);
}
loadUserRegistrations(): void {
  this.eventService.getAllRegistrations().subscribe({
    next: data => {
      this.userRegistrations = data.filter(reg => reg.participant?.id === this.currentUser.id);
    },
    error: err => console.error("❌ Erreur chargement inscriptions", err)
  });
}

 cancelRegistration(registrationId: number): void {
    this.eventService.deleteRegistration(registrationId).subscribe({
      next: () => {
        console.log(`✅ Désinscription réussie (id=${registrationId})`);
        this.loadUserRegistrations();
      },
      error: err => console.error('❌ Erreur lors de la désinscription', err)
    });
  }

}
