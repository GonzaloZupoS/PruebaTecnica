import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {

    const expectedRole = route.data['role'] as string;

    const userRole = this.authService.getRole();

    if (userRole && userRole === expectedRole) {
      return true;
    }

    return this.router.createUrlTree(['/products']);
  }
}