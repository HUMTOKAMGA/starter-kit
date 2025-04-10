import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Méthodes d'authentification
  login(credentials: { username: string; password: string }) {
    return this.http.post('/api/auth/login', credentials);
  }

  logout() {
    return this.http.post('/api/auth/logout', {});
  }
} 