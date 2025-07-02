import { Component,OnInit } from '@angular/core';
import { RegistrationService } from '../../../services/registration';
import { EventService } from '../../../services/event';
import { UserService } from '../../../services/user';
import { Router } from '@angular/router';
import { Participant } from '../../participant/participant';

@Component({
  selector: 'app-registration-add',
  standalone: false,
  templateUrl: './registration-add.html',
  styleUrl: './registration-add.css'
})
export class RegistrationAdd implements OnInit {
 participants: any[] = [];
  events: any[] = [];

  registration = {
    participantId: null,
    eventId: null
  };

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getParticipants().subscribe(data => this.participants = data);
    this.eventService.getAllEvents().subscribe(data => this.events = data);
  }

  onSubmit() {
    const payload = {
      registrationDate: new Date(),
      participant: { id: this.registration.participantId },
      event: { id: this.registration.eventId }
    };
 console.log('Payload envoyé :', payload);
    this.registrationService.addRegistration(payload).subscribe(() => {
      this.router.navigate(['/admin/registrations']);
    });
  }
}
