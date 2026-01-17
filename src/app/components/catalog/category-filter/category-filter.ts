import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogService } from '../../../services/catalogService';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  templateUrl: './category-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilter {
  readonly catalog = inject(CatalogService);

  readonly categories = this.catalog.categoriesWithCounts;

  select(cat: string) {
    this.catalog.setCategory(cat);
  }
}
