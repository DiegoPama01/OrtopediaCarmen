import { Component, Input } from '@angular/core';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCard {
  @Input() category!: Category;
}
