import { Component, inject } from '@angular/core';
import { AdminHeaderService } from '../../../services/adminHeaderService';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})
export class AdminHeader {
  readonly header = inject(AdminHeaderService);

  ctaClick() {
    this.header.onCta()?.();
  }
}
