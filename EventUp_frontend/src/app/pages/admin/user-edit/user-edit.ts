import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css'
})
export class UserEdit  implements OnInit {
userId!: number;

 user: User = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: { id: 0, name: '' }
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = idParam ? +idParam : 0;

    this.userService.getUserById(this.userId).subscribe({
      next: (data) => this.user = data,
      error: () => alert('Utilisateur non trouvé')
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        alert('Utilisateur mis à jour avec succès');
        this.router.navigate(['/admin/users']);
      },
      error: () => alert('Erreur lors de la mise à jour')
    });
  }
}
