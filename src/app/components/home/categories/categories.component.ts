import { Component, inject, computed } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryCard } from '../category-card/category-card.component';
import { CategoryService } from '../../../services/categoryService';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [CategoryCard],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css'
})
export class CategoriesComponent {
    private categoryService = inject(CategoryService);

    // Map database categories to display format (max 3 for home page)
    categories = computed<Category[]>(() => {
        return this.categoryService.items()
            .slice(0, 3) // Show only first 3 categories
            .map(cat => ({
                icon: cat.icon || 'category', // Use icon from DB or default
                title: cat.name,
                description: cat.description || `Productos de ${cat.name.toLowerCase()}`,
                link: `/catalog?category=${encodeURIComponent(cat.name)}` // Pass category as query param   
            }));
    });
}
