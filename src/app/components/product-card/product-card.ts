import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../services/productService';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  @Input({ required: true }) product!: Product;

  get availabilityLabel() {
    return this.product.availability === 'in_stock' ? 'En Stock' : 'Bajo Pedido';
  }
}
