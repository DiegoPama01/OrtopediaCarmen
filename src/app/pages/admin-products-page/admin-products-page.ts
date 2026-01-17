import { Component, effect, inject } from '@angular/core';
import { AdminHeaderService } from '../../services/adminHeaderService';
import { ProductService } from '../../services/productService';
import { ProductItem } from '../../models/product';
import { ItemConfig } from '../../models/list.types';
import { AdminListShell } from '../../components/admin/admin-list/admin-list';

@Component({
  selector: 'app-admin-products-page',
  standalone: true,
  imports: [AdminListShell],
  templateUrl: './admin-products-page.html',
  styleUrl: './admin-products-page.css',
})
export class AdminProductsPage {
  private header = inject(AdminHeaderService);

  readonly store = inject(ProductService);

  readonly config: ItemConfig<ProductItem> = {
    searchPlaceholder: 'Buscar productos por nombre o SKU…',
    selectFilter: {
      labelAll: 'Todas las Categorías',
      options: this.store.categories,
      value: this.store.category,
      onChange: (v) => this.store.setCategory(v),
    },
    columns: [
      { key: 'img', header: 'Imagen', kind: 'image', field: 'imageUrl', widthClass: 'w-20' },
      { key: 'name', header: 'Nombre', field: 'name' },
      { key: 'quantity', header: 'Cantidad', field: 'quantity' },
      { key: 'cat', header: 'Categoría', kind: 'badge', field: 'category' },
      { key: 'price', header: 'Precio', align: 'right', value: r => `€${r.price.toFixed(2)}`, style: 'text-accent' },
    ],
    actions: [
      { icon: 'edit', label: 'Editar', onClick: p => console.log('edit', p.id) },
      { icon: 'delete', label: 'Eliminar', tone: 'danger', onClick: p => console.log('delete', p.id) },
    ],
  };

  constructor() {
    effect(() => {
      this.header.setHeader({
        title: 'Gestión de Productos',
        subtitle: 'Administra el catálogo completo de productos ortopédicos para la venta online.',
        ctaLabel: 'Añadir Nuevo Producto',
        onCta: () => console.log('Abrir modal de crear producto'),
      });
    });
  }
}
