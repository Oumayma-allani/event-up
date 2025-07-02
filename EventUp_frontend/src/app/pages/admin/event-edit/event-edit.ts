import { Component,OnInit } from '@angular/core';
import { EventService } from '../../../services/event';
import { Event } from '../../../models/event';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user';
import { User } from '../../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { EventFull } from '../../../models/event-full';
@Component({
  selector: 'app-event-edit',
  standalone: false,
  templateUrl: './event-edit.html',
  styleUrl: './event-edit.css'
})
export class EventEdit implements OnInit {
 event: EventFull = {
  id: 0,
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  sousCategorie: { id: 0, name: '' },
  local: { id: 0, name: '', address: '', capacity: 0, type: '' },
  organisateur: { id: 0, firstname: '', lastname: '', email: '', password: '', role: { id: 0, name: '' } }
};

  sousCategories: any[] = [];
  locals: any[] = [];
   organisateurs: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
      this.userService.getOrganisateurs().subscribe((data) => {
         console.log('✔ Organisateurs reçus :', data); // 👈
      this.organisateurs = data;
    });
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEvent(id);
    this.loadSousCategories();
    this.loadLocals();
    
  }

  loadEvent(id: number): void {
  this.http.get<EventFull>(`http://localhost:8080/api/events/${id}`).subscribe({
    next: (data) => {
      this.event = {
        ...data,
        sousCategorie: data.sousCategorie || { id: 0, name: '' },
        local: data.local || { id: 0, name: '', address: '', capacity: 0, type: '' },
        organisateur: data.organisateur || {
          id: 0,
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          role: { id: 0, name: '' }
        }
      };
    },
    error: () => alert('Erreur lors du chargement de l’événement')
  });
}


  loadSousCategories(): void {
    this.http.get<any[]>('http://localhost:8080/api/sousCategories').subscribe({
      next: (data) => {
      console.log('✔ Sous-catégories reçues :', data); // 👈
      this.sousCategories = data;
    },
      error: () => alert('Erreur chargement sous-catégories')
    });
  }

  loadLocals(): void {
    this.http.get<any[]>('http://localhost:8080/api/locals').subscribe({
      next: (data) => {
      console.log('✔ Locaux reçus :', data); // 👈 Ajoute ça
      this.locals = data;
    },
      
      error: () => alert('Erreur chargement locaux')
    });
  }

  

  onSubmit(): void {
    this.http.put(`http://localhost:8080/api/events/${this.event.id}`, this.event).subscribe({
      next: () => {
        alert('Événement mis à jour avec succès');
        this.router.navigate(['/admin/events']);
      },
      error: () => alert('Erreur lors de la mise à jour de l’événement')
    });
  }
}
