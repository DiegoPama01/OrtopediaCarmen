import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeader } from '../../components/admin/admin-header/admin-header';
import { AdminSidebar } from '../../components/admin/admin-sidebar/admin-sidebar';
import { AdminSidebarService } from '../../services/adminSidebarService';

@Component({
  selector: 'app-admin-layout-page',
  standalone: true,
  imports: [RouterOutlet, AdminHeader, AdminSidebar],
  templateUrl: './admin-layout-page.html',
  styleUrl: './admin-layout-page.css',
})
export class AdminLayoutPage {
  sidebarSvc = inject(AdminSidebarService);
}
