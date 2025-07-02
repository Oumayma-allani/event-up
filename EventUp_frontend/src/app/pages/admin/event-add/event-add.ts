import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user';
import { User } from '../../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../../../services/event';
import { Local } from '../../../services/local';
import { SousCategorie } from '../../../services/sous-categorie';
@Component({
  selector: 'app-event-add',
  standalone: false,
  templateUrl: './event-add.html',
  styleUrl: './event-add.css'
})
export class EventAdd implements OnInit{
event = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    sousCategorie: { id: null },
    local: { id: null },
    organisateur: { id: null }
  };

  sousCategories: any[] = [];
  locals: any[] = [];
  organisateurs: any[] = [];

  constructor(
    private eventService: EventService,
    private sousCategorieService: SousCategorie,
    private localService: Local,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sousCategorieService.getAll().subscribe(data => this.sousCategories = data);
    this.localService.getAll().subscribe(data => this.locals = data);
    this.userService.getOrganisateurs().subscribe(data => this.organisateurs = data);
  }

  onSubmit() {
     console.log('🔄 Envoi du formulaire', this.event); 
     this.eventService.create(this.event).subscribe({
      next: () => {
        console.log('✅ Événement ajouté avec succès');
        this.router.navigate(['/admin/events']);
      },
      error: err => {
        console.error('❌ Erreur lors de l\'ajout :', err);
        alert('Erreur lors de l\'ajout');
      }
    });
  }
}
