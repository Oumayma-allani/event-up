import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SousCategorie {
   private apiUrl = 'http://localhost:8080/api/sousCategories';
constructor(private http: HttpClient) {}

  createSubcategory(data: any): Observable<any> {
  return this.http.post(this.apiUrl, data);
}
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
