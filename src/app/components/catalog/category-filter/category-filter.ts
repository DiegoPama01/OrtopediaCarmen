import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogService, Category } from '../../../services/catalogService';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  templateUrl: './category-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilter {
  readonly catalog = inject(CatalogService);

  readonly categories: Array<{ key: Category; label: string }> = [
    { key: 'ALL', label: 'Todos los productos' },
    { key: 'Movilidad', label: 'Movilidad' },
    { key: 'Higiene y Baño', label: 'Higiene y Baño' },
    { key: 'Descanso', label: 'Descanso' },
    { key: 'Ortopedia Técnica', label: 'Ortopedia Técnica' },
  ];

  select(cat: Category) {
    this.catalog.setCategory(cat);
  }
}
