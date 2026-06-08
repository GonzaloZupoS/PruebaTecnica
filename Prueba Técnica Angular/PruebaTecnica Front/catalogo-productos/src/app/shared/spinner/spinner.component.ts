import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  private loadingService = inject(LoadingService);

  loading$ = this.loadingService.loading$;
}