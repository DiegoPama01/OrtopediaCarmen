import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductItem } from '../../../models/product';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  @Input({ required: true }) product!: ProductItem;

  get availabilityLabel() {
    return this.product.quantity > 0 ? 'En Stock' : 'Bajo Pedido';
  }
}
