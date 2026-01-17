import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogService } from '../../services/catalogService';

@Component({
  selector: 'app-catalog-search-bar',
  standalone: true,
  templateUrl: './catalog-search-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSearchBar {
  readonly catalog = inject(CatalogService);

  onInput(value: string) {
    this.catalog.setSearch(value);
  }
}
