import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface Favorite {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) { }

  getFavorites(): Observable<any> {
    return this.http.get<Favorite[]>(`/api/favorites`);
  }

  addFavorite(id: number): Observable<any> {
    return this.http.post<Favorite>(`/api/favorites/${id}`, {});
  }

  removeFavorite(id: number): Observable<any> {
    return this.http.delete<Favorite>(`/api/favorites/${id}`);
  }
}
