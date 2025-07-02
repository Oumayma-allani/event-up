import { Component ,OnInit} from '@angular/core';
import { Event } from '../../../models/event';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event';
import { SousCategorieAdd } from '../sous-categorie-add/sous-categorie-add';
@Component({
  selector: 'app-events-list',
  standalone: false,
  templateUrl: './events-list.html',
  styleUrl: './events-list.css'
})
export class EventsList implements OnInit{
events: Event[] = [];
 showPopup = false;
 showLocalPopup = false;
  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
  this.eventService.getAllEvents().subscribe({
    next: (data) => this.events = data,
    error: (err) => {
      console.error('Erreur API :', err);
      alert('Erreur de chargement des événements');
    }
  });
}

  onEdit(event: Event): void {
    this.router.navigate(['/admin/events/edit', event.id]);
  }

  onDelete(id: number): void {
    if (confirm('Supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.events = this.events.filter(e => e.id !== id);
      });
    }
  }
}
