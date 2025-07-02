import { Component,OnInit } from '@angular/core';
import { Local } from '../../../services/local';
@Component({
  selector: 'app-local-add',
  standalone: false,
  templateUrl: './local-add.html',
  styleUrl: './local-add.css'
})
export class LocalAdd implements OnInit{
 showModal = true;

  local = {
    name: '',
    address: '',
    capacity: null,
    type: ''
  };

  constructor(private localService: Local) {}

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  onSubmit() {
    this.localService.create(this.local).subscribe(() => {
      this.close();
    });
  }

  close() {
    this.showModal = false;
    document.body.style.overflow = 'auto';
  }
}
