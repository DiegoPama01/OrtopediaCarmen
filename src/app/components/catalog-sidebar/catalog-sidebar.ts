import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryFilter } from '../category-filter/category-filter';
import { PriceRangeFilter } from '../price-range-filter/price-range-filter';
import { AvailabilityFilter } from '../availability-filter/availability-filter';

@Component({
  selector: 'app-catalog-sidebar',
  standalone: true,
  imports: [CategoryFilter, PriceRangeFilter, AvailabilityFilter],
  templateUrl: './catalog-sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSidebar { }
