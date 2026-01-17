import { Component, inject } from '@angular/core';
import { AdminHeaderService } from '../../../services/adminHeaderService';
import { AdminSidebarService } from '../../../services/adminSidebarService';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})
export class AdminHeader {
  readonly header = inject(AdminHeaderService);
  readonly sidebar = inject(AdminSidebarService);

  ctaClick() {
    this.header.onCta()?.();
  }
}
