import { Component,OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from '../../../services/event';
import { RegistrationService } from '../../../services/registration';
@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar implements OnInit{
  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    events: []  ,
     dayMaxEventRows: 3,  
views: {
  dayGridMonth: {
    dayMaxEventRows: 3
  }
}

  };

  constructor(private eventService: EventService, private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadRegistrations();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(events => {
      const formattedEvents = events.map((event: any) => ({
        title: '🗓️ ' + event.title,
        date: event.startDate,
        color: '#28a745'
      }));
      this.calendarOptions.events = [...this.calendarOptions.events, ...formattedEvents];
    });
  }

  loadRegistrations() {
    this.registrationService.getRegistrations().subscribe(regs => {
      const formattedRegs = regs.map((reg: any) => ({
        title: '📝 ' + reg.participant.firstname + ' inscrit à ' + reg.event.title,
        date: reg.registrationDate,
        color: '#007bff'
      }));
      this.calendarOptions.events = [...this.calendarOptions.events, ...formattedRegs];
    });
  }
}
