import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogService } from '../../services/catalogService';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-price-range-filter',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './price-range-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceRangeFilter {
  readonly catalog = inject(CatalogService);

  readonly min = 0;
  readonly max = 10000;
  readonly step = 50;

  onMaxChange(value: string) {
    const max = Number(value);
    this.catalog.setPriceRange(this.min, Number.isFinite(max) ? max : this.max);
  }
}
