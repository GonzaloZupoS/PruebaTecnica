import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly excludedUrls: string[] = [
    '/auth/login'
  ];

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // =========================
    // 1. SKIP REQUESTS EXCLUIDAS
    // =========================
    if (this.shouldSkip(req.url)) {
      return next.handle(req);
    }

    // =========================
    // 2. OBTENER TOKEN
    // =========================
    const token = this.authService.getToken();

    if (!token) {
      return next.handle(req);
    }

    // =========================
    // 3. EVITAR DUPLICAR HEADER
    // =========================
    if (req.headers.has('Authorization')) {
      return next.handle(req);
    }

    // =========================
    // 4. CLONAR REQUEST
    // =========================
    const authReq = req.clone({
      setHeaders: {
        Authorization: this.buildAuthHeader(token)
      }
    });

    return next.handle(authReq);
  }

  // =========================
  // AUTH HEADER FORMAT
  // =========================
  private buildAuthHeader(token: string): string {
    return `Bearer ${token}`;
  }

  // =========================
  // SKIP LOGIC
  // =========================
  private shouldSkip(url: string): boolean {
    return this.excludedUrls.some(excluded =>
      url.includes(excluded)
    );
  }
}