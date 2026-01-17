import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  standalone: true,
  imports: [],
  templateUrl: './auth-card.html',
})
export class AuthCard {
  @Input() icon: string = 'admin_panel_settings';
  @Input() title: string = 'Acceso';
  @Input() subtitle: string = '';
  @Input() securityText: string = 'Acceso seguro con cifrado SSL';
  @Input() securityIcon: string = 'verified_user';
}
