import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getEventById(id: number): Observable<Event> {
  return this.http.get<Event>(`${this.apiUrl}/${id}`);
}

updateEvent(id: number, event: Event): Observable<Event> {
  return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
}
 create(event: any): Observable<any> {
  return this.http.post(this.apiUrl, event);
}
createWithImage(formValue: any, image: File, currentUserId: number) {
  const eventPayload = {
    title: formValue.title,
    description: formValue.description,
    startDate: formValue.startDate,
    endDate: formValue.endDate,
    localId: formValue.local?.id ?? formValue.local,
    sousCategorieId: formValue.sousCategorie?.id ?? formValue.sousCategorie,
    organisateurId: currentUserId   // ✅ Ajouté ici
  };

  const formData = new FormData();
  formData.append('event', new Blob([JSON.stringify(eventPayload)], { type: 'application/json' }));

  if (image) {
    formData.append('image', image);
  }

  return this.http.post<any>('http://localhost:8080/api/events/upload', formData);
}

}
