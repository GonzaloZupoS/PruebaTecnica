import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {

  providers: [

    // =========================
    // ROUTER
    // =========================
    provideRouter(routes),

    // =========================
    // HTTP CLIENT
    // =========================
    provideHttpClient(withInterceptorsFromDi()),

    // =========================
    // AUTH INTERCEPTOR
    // =========================
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    // =========================
    // LOADING INTERCEPTOR
    // =========================
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }

  ]
};