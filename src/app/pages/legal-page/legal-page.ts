import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-legal-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './legal-page.html',
    styleUrl: './legal-page.css'
})
export class LegalPage {
    constructor() { }
}
