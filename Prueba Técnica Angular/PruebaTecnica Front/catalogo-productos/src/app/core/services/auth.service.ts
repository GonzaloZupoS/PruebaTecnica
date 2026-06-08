import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://localhost:7004/api/auth';
  private readonly tokenKey = 'token';

  // =========================
  // LOGIN
  // =========================
  login(credentials: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  // =========================
  // LOGOUT
  // =========================
  logout(): void {
    this.clearSession();
  }

  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // =========================
  // TOKEN
  // =========================
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // =========================
  // DECODE TOKEN
  // =========================
  private decodeToken(): any | null {

    const token = this.getToken();

    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }

  // =========================
  // USER INFO
  // =========================
  getUser(): any | null {
    return this.decodeToken();
  }

  getUsername(): string | null {

    const user = this.decodeToken();

    return (
      user?.sub ||
      user?.username ||
      user?.unique_name ||
      null
    );
  }

  // =========================
  // ROLE HANDLING (FIX IMPORTANTE)
  // =========================
  getRole(): string | null {

    const user = this.decodeToken();

    if (!user) return null;

    console.log('JWT PAYLOAD:', user);

    // soporta múltiples formatos de backend
    const role =
      user?.role ||
      user?.Role ||
      user?.roles?.[0] ||
      user?.authorities?.[0] ||
      null;

    return role;
  }

  isAdmin(): boolean {
    const role = this.getRole();

    return (
      role === 'ADMIN' ||
      role === 'ROLE_ADMIN' ||
      role === 'admin'
    );
  }

  isUser(): boolean {
    const role = this.getRole();

    return (
      role === 'USER' ||
      role === 'ROLE_USER' ||
      role === 'user'
    );
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  // =========================
  // AUTH STATUS
  // =========================
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isTokenExpired(): boolean {

    const user = this.decodeToken();

    if (!user?.exp) return false;

    const now = Math.floor(Date.now() / 1000);

    return user.exp < now;
  }

  isSessionValid(): boolean {
    return this.isAuthenticated() && !this.isTokenExpired();
  }
}