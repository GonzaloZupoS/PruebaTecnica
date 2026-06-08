import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SpinnerComponent],
  template: `
    <app-navbar></app-navbar>
    <app-spinner></app-spinner>
    <router-outlet></router-outlet>
  `
})
export class App {}