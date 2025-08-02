import { Component,OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

import { UserService } from '../../services/user';
import { User } from '../../models/user.model'; 
import { HttpClient } from '@angular/common/http';
import { EventService } from '../../services/event';
import { Local } from '../../services/local';
import { SousCategorie } from '../../services/sous-categorie';
import { CategorieService } from '../../services/categorie';
@Component({
  selector: 'app-organisateur',
  standalone: false,
  templateUrl: './organisateur.html',
  styleUrl: './organisateur.css'
})
export class Organisateur implements OnInit {

  currentUser: any = null;
   sousCategories: any[] = [];
  locals: any[] = [];
 showAddPopup: boolean = false;
showEditPopup: boolean = false;
newEvent: any;
selectedImage: File | null = null;
categories: any[] = [];
newCategorie = { name: '' };
newSousCategorie = { name: '', categorieId: null };
events: any[] = [];
nouveauLocal = {
  name: '',
  address: '',
  capacity: null,
  type: ''
};

 constructor(
    private eventService: EventService,
    private sousCategorieService: SousCategorie,
    private localService: Local,
    private userService: UserService,
    private router: Router,
    private authService: Auth,
    private categorieService : CategorieService
  ) {}

openAddPopup(): void {
  this.resetEventForm();
  this.showAddPopup = true;
}

onImageSelected(event: any) {
  this.selectedImage = event.target.files[0];
}
 ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.currentUser = this.authService.getCurrentUser();
    console.log('👤 Utilisateur connecté :', this.currentUser);
    
    this.resetEventForm();

    this.localService.getAll().subscribe(data => {this.locals = data;});
  this.loadCategories();

  this.sousCategorieService.getAll().subscribe(data => {this.sousCategories = data;});
 this.eventService.getAllEvents().subscribe(data => {
    this.events = data;

  });
  
  }
  
loadCategories(): void {
  this.categorieService.getAll().subscribe(data => {
    this.categories = data;
  });
}

addCategorie(): void {
  this.categorieService.create(this.newCategorie).subscribe(() => {
    alert("✅ Catégorie ajoutée !");
    this.newCategorie.name = '';
    this.loadCategories();
  });
}

addSousCategorie(): void {
  const payload = {
    name: this.newSousCategorie.name,
    categorie: { id: this.newSousCategorie.categorieId }
    
  };

  this.sousCategorieService.createSubcategory(payload).subscribe(() => {
    alert("✅ Sous-catégorie ajoutée !");
    this.newSousCategorie = { name: '', categorieId: null };
    this.localService.getAll().subscribe(data => {
        this.locals = data;
      });
  });
}
   resetEventForm(): void {
    this.newEvent = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      image: '',
      sousCategorie: { id: null },
      local: { id: null },
      organisateur: { id: this.currentUser.id}
    };
  }
  logout(): void {
  this.authService.logout();
}
 
  /*submitEvent() {
    console.log('Nouvel événement :', this.newEvent);
  
     this.eventService.create(this.newEvent).subscribe({
      next: () => {
        console.log('✅ Événement ajouté avec succès');
         this.showEventPopup = false;
         this.resetEventForm(); 
        this.router.navigate(['/organisateur']);
      },
      error: err => {
        console.error('❌ Erreur lors de l\'ajout :', err);
        alert('Erreur lors de l\'ajout');
      }
    });

  }*/
 isDateValid(): boolean {
  if (!this.newEvent.startDate || !this.newEvent.endDate) return true;
  return new Date(this.newEvent.startDate) < new Date(this.newEvent.endDate);
}

 submitEvent() {
  if (!this.isDateValid()) {
    alert("❌ La date de début doit être antérieure à la date de fin.");
    return;
  }
  this.newEvent.organisateur = { id: this.currentUser.id };
  this.newEvent.local = { id: this.newEvent.local.id || this.newEvent.local }; // si dropdown donne juste l'id
  this.newEvent.sousCategorie = { id: this.newEvent.sousCategorie.id || this.newEvent.sousCategorie };

this.eventService.createWithImage(this.newEvent, this.selectedImage!, this.currentUser.id)
  .subscribe({
    next: () => {
      console.log("✅ Événement modifié");
      this.showAddPopup = false;
      this.loadEvents();
    },
    
  });
}

  scrollToEvents(): void {
  const element = document.getElementById('blog');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
scrollToCategories(): void {
  const element = document.getElementById('categorie');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
loadEvents(): void {
  this.eventService.getAllEvents().subscribe({
    next: data => this.events = data,
    error: err => console.error('Erreur lors du chargement des événements', err)
  });
}
onDeleteEvent(id: number): void {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        alert("✅ Événement supprimé !");
        this.loadEvents(); // Recharger la liste
      },
      error: err => {
        console.error("Erreur lors de la suppression :", err);
        alert("❌ Échec de la suppression");
      }
    });
  }
}

onEditEvent(event: any): void {
  if (!this.isDateValid()) {
    alert("❌ La date de début doit être antérieure à la date de fin.");
    return;
  }
  this.newEvent = {
    ...event,
    local: event.local ? { id: event.local.id } : { id: null },
    sousCategorie: event.sousCategorie ? { id: event.sousCategorie.id } : { id: null }
  };
  this.showEditPopup = true;
}
submitEdit(): void {
  this.newEvent.organisateur = { id: this.currentUser.id };
  this.newEvent.local = { id: this.newEvent.local.id || this.newEvent.local };
  this.newEvent.sousCategorie = { id: this.newEvent.sousCategorie.id || this.newEvent.sousCategorie };

  this.eventService.updateEvent(this.newEvent.id, this.newEvent).subscribe({
    next: () => {
      console.log("✅ Événement modifié");
      this.showEditPopup = false;
      this.loadEvents();
    },
    error: err => {
      console.error("❌ Erreur modification", err);
      alert("Erreur lors de la modification");
    }
  });
}
ajouterLocal() {
  if (!this.nouveauLocal.name || !this.nouveauLocal.address || !this.nouveauLocal.capacity || !this.nouveauLocal.type) {
    alert("Tous les champs sont obligatoires.");
    return;
  }

  this.localService.create(this.nouveauLocal).subscribe({
    next: () => {
      alert("✅ Local ajouté avec succès !");
      this.nouveauLocal = { name: '', address: '', capacity: null, type: '' };
      this.localService.getAll().subscribe(data => {
        this.locals = data;
      });
    },
    error: err => {
      console.error("Erreur ajout local :", err);
      alert("❌ Erreur lors de l'ajout");
    }
  });
}
}