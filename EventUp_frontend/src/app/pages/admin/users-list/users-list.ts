import { Component,OnInit} from '@angular/core';
import { UserService } from '../../../services/user';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.html',
  styleUrl: './users-list.css'
})
export class UsersList implements OnInit{
users: User[] = [];
selectedRole: string = '';
filteredUsers: User[] = [];

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
    next: (data) => {
      this.users = data;
      this.filteredUsers = data; 
    },
    error: (err) => console.error('Erreur récupération users', err)
  });
  }
  exportToExcel(): void {
  const exportData = this.filteredUsers.map(user => ({
    Nom: `${user.firstname} ${user.lastname}`,
    Email: user.email,
    Rôle: user.role?.name || ''
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  const workbook: XLSX.WorkBook = { Sheets: { 'Utilisateurs': worksheet }, SheetNames: ['Utilisateurs'] };

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  FileSaver.saveAs(blob, 'liste_utilisateurs.xlsx');
}
  filterUsers(): void {
  if (this.selectedRole === '') {
    this.filteredUsers = this.users;
  } else {
    this.filteredUsers = this.users.filter(
      user => user.role?.name === this.selectedRole
    );
  }
}

onEdit(user: User): void {
 console.log('Clic modifier utilisateur', user);

this.router.navigate(['/admin/users/edit', user.id]);  
}

onDelete(id: number): void {
  if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (err) => {
        console.error('Erreur suppression utilisateur', err);
        alert("Échec de la suppression.");
      }
    });
  }
}

}
