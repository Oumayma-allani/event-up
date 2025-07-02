import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

    private apiUrl = 'http://localhost:8080/api/registrations';

  constructor(private http: HttpClient) {}

 getRegistrations(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8080/api/registrations');
}
 addRegistration(registration: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, registration);
  }

  
  updateRegistration(id: number, registration: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, registration);
  }


  deleteRegistration(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
