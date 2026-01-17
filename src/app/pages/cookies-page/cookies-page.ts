import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cookies-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cookies-page.html',
    styleUrl: './cookies-page.css'
})
export class CookiesPage {
    constructor() { }
}
