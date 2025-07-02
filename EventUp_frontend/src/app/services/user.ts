import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/${id}`);
}

updateUser(user: User): Observable<User> {
  return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
}
 getOrganisateurs(): Observable<User[]> {
    return new Observable((observer) => {
      this.http.get<User[]>(this.apiUrl).subscribe(users => {
        const organisateurs = users.filter(u => u.role.name === 'ORGANISATEUR');
        observer.next(organisateurs);
        observer.complete();
      });
    });
  }
  getParticipants(): Observable<User[]> {
    return new Observable((observer) => {
      this.http.get<User[]>(this.apiUrl).subscribe(users => {
        const participants= users.filter(u => u.role.name === 'PARTICIPANT');
        observer.next(participants);
        observer.complete();
      });
    });
  }
}
