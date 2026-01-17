import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogService } from '../../../services/catalogService';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './product-grid.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGrid {
  readonly catalog = inject(CatalogService);
}
