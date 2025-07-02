import { Component,OnInit} from '@angular/core';
import { UserService } from '../../../services/user';
import { Auth } from '../../../services/auth';
import { EventService } from '../../../services/event';
import { RegistrationService } from '../../../services/registration';
import { Local } from '../../../services/local';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
usersCount = 0;
eventsCount = 0;
registrationsCount = 0;
localsCount = 0;
constructor(
  private authService: Auth,
  private router: Router,
  private userService: UserService,
  private eventService: EventService,
  private registrationService: RegistrationService,
  private localService: Local
) {}
ngOnInit(): void {
  this.userService.getAllUsers().subscribe(users => this.usersCount = users.length);
this.eventService.getAllEvents().subscribe(events => this.eventsCount = events.length);
this.registrationService.getRegistrations().subscribe(r => this.registrationsCount = r.length);
this.localService.getAll().subscribe(locals => this.localsCount = locals.length);
  this.initStatisticsChart();
}
initStatisticsChart(): void {
  const ctx = document.getElementById('statisticsChart') as HTMLCanvasElement;

  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: 'Subscribers',
            borderColor: '#f3545d',
            backgroundColor: 'rgba(243, 84, 93, 0.2)',
            data: [150, 200, 180, 210, 190, 220, 240, 260, 250, 270, 300, 350],
            fill: true,
            tension: 0.4
          },
          {
            label: 'New Visitors',
            borderColor: '#fdaf4b',
            backgroundColor: 'rgba(253, 175, 75, 0.2)',
            data: [120, 100, 130, 140, 130, 125, 140, 150, 160, 170, 180, 190],
            fill: true,
            tension: 0.4
          },
          {
            label: 'Active Users',
            borderColor: '#177dff',
            backgroundColor: 'rgba(23, 125, 255, 0.2)',
            data: [500, 450, 430, 530, 480, 420, 390, 450, 550, 600, 700, 850],
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
}
