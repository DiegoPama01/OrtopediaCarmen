import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryCard } from '../category-card/category-card.component';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [CategoryCard],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css'
})
export class CategoriesComponent {
    categories: Category[] = [
        {
            icon: 'spa',
            title: 'Bienestar',
            description: 'Descanso, confort y cuidado corporal diseñado para su tranquilidad diaria.',
            link: '#'
        },
        {
            icon: 'wheelchair_pickup',
            title: 'Movilidad',
            description: 'Sillas de ruedas, andadores y ayudas técnicas para facilitar sus desplazamientos.',
            link: '#'
        },
        {
            icon: 'night_shelter',
            title: 'Vida Diaria',
            description: 'Ayudas para el baño y el hogar que facilitan las tareas cotidianas.',
            link: '#'
        }
    ]
}
