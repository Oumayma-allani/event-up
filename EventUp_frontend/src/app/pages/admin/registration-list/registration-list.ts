import { Component,OnInit } from '@angular/core';
import { Registration } from '../../../models/registration';
import { RegistrationService } from '../../../services/registration';
@Component({
  selector: 'app-registration-list',
  standalone: false,
  templateUrl: './registration-list.html',
  styleUrl: './registration-list.css'
})
export class RegistrationList implements OnInit {
 registrations: Registration[] = [];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.registrationService.getRegistrations().subscribe({
      next: (data) => this.registrations = data,
      error: () => alert("Erreur lors du chargement des inscriptions")
    });
  }
  deleteRegistration(id: number) {
  if (confirm('Voulez-vous vraiment supprimer cette inscription ?')) {
    this.registrationService.deleteRegistration(id).subscribe(() => {
      // filtre la ligne supprimée de la liste sans recharger
      this.registrations = this.registrations.filter(r => r.id !== id);
    });
  }
}
}
