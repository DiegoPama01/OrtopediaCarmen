import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLinkActive, RouterLinkWithHref, RouterLink]
})
export class HeaderComponent { }
