import { Component,OnInit } from '@angular/core';
import { SousCategorie } from '../../../services/sous-categorie';
import { CategorieService } from '../../../services/categorie'; 
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-sous-categorie-add',
  standalone: false,
  templateUrl: './sous-categorie-add.html',
  styleUrl: './sous-categorie-add.css'
})
export class SousCategorieAdd implements OnInit {
  
categories: any[] = [];
  showModal = true;

  subcategory = {
    name: '',
    categorie: null
  };

  constructor(
    private categoryService: CategorieService,
    private subcategoryService: SousCategorie
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => this.categories = data);
    document.body.style.overflow = 'hidden';

  }

  onSubmit() {
    const payload = {
      name: this.subcategory.name,
      categorie: this.subcategory.categorie
    };
    this.subcategoryService.createSubcategory(payload).subscribe(() => {
      this.close();
      // Tu peux ajouter une notification ici si tu veux
    });
  }

  close() {
    this.showModal = false;
    document.body.style.overflow = 'auto';

    // Tu peux également naviguer ou rafraîchir ici si besoin
  }
}
