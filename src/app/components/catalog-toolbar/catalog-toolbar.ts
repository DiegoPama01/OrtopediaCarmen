import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogService, SortOption } from '../../services/catalogService';

@Component({
  selector: 'app-catalog-toolbar',
  standalone: true,
  templateUrl: './catalog-toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogToolbar {
  readonly catalog = inject(CatalogService);

  readonly sortOptions: Array<{ value: SortOption; label: string }> = [
    { value: 'newest', label: 'Más recientes' },
    { value: 'priceAsc', label: 'Precio: menor a mayor' },
    { value: 'priceDesc', label: 'Precio: mayor a menor' },
    { value: 'nameAsc', label: 'Nombre: A–Z' },
  ];

  onSortChange(value: string) {
    this.catalog.setSort(value as SortOption);
  }
}
