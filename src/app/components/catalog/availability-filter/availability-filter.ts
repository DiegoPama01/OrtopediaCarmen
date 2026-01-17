import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogService } from '../../../services/catalogService';

@Component({
  selector: 'app-availability-filter',
  standalone: true,
  templateUrl: './availability-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailabilityFilter {
  readonly catalog = inject(CatalogService);

  setInStock(value: boolean) {
    this.catalog.toggleInStock(value);
  }

  setBackorder(value: boolean) {
    this.catalog.toggleBackorder(value);
  }
}
