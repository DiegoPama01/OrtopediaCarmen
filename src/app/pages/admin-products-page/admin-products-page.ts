import { Component, effect, inject, signal } from '@angular/core';
import { AdminHeaderService } from '../../services/adminHeaderService';
import { ProductService } from '../../services/productService';
import { CategoryService } from '../../services/categoryService';
import { ProductItem } from '../../models/product';
import { ItemConfig } from '../../models/list.types';
import { AdminListShell } from '../../components/admin/admin-list/admin-list';
import { ProductModalComponent, ProductModalSavePayload } from '../../components/admin/product-modal/product-modal';

@Component({
  selector: 'app-admin-products-page',
  standalone: true,
  imports: [AdminListShell, ProductModalComponent],
  templateUrl: './admin-products-page.html',
  styleUrl: './admin-products-page.css',
})
export class AdminProductsPage {
  private header = inject(AdminHeaderService);

  readonly store = inject(ProductService);
  readonly catStore = inject(CategoryService);

  readonly showModal = signal(false);
  readonly adding = signal(false);
  readonly editingProduct = signal<ProductItem | null>(null);

  readonly config: ItemConfig<ProductItem> = {
    searchPlaceholder: 'Buscar productos por nombre…',
    selectFilter: {
      labelAll: 'Todas las Categorías',
      options: this.store.categories,
      value: this.store.category,
      onChange: (v) => this.store.setCategory(v),
    },
    columns: [
      { key: 'img', header: 'Imagen', kind: 'image', value: r => r.imageUrl ?? '', widthClass: 'w-20' },
      { key: 'name', header: 'Nombre', field: 'name' },
      { key: 'quantity', header: 'Cantidad', field: 'quantity' },
      { key: 'cat', header: 'Categoría', kind: 'badge', value: r => r.category?.name ?? 'Sin categoría' },
      { key: 'price', header: 'Precio', align: 'right', value: r => `€${r.price.toFixed(2)}`, style: 'text-accent' },
    ],
    actions: [
      { icon: 'edit', label: 'Editar', onClick: p => this.openEdit(p) },
      {
        icon: 'delete', label: 'Eliminar', tone: 'danger', onClick: p => {
          if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            this.store.remove(p.id);
          }
        }
      },
    ],
  };

  constructor() {
    effect(() => {
      this.header.setHeader({
        title: 'Gestión de Productos',
        subtitle: 'Administra el catálogo completo de productos ortopédicos para la venta online.',
        ctaLabel: 'Añadir Nuevo Producto',
        onCta: () => this.openCreate(),
      });
    });
  }

  openCreate() {
    this.editingProduct.set(null);
    this.showModal.set(true);
  }

  openEdit(p: ProductItem) {
    this.editingProduct.set(p);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingProduct.set(null);
  }

  async onSave(payload: ProductModalSavePayload) {
    this.adding.set(true);
    try {
      const p = payload.product;

      // Handle Image Upload
      if (payload.imageFile) {
        const url = await this.store.uploadImage(payload.imageFile);
        if (url) {
          p.imageUrl = url; // Single string, not array
        } else {
          // If upload fails, maybe stop and show error? 
          // Store already sets error signal, user sees it.
          // We can choose to abort or continue without image.
          // Let's abort to be safe.
          this.adding.set(false);
          return;
        }
      }

      if (p.id) {
        await this.store.update(p.id, p);
      } else {
        await this.store.create(p);
      }
      this.closeModal();
    } finally {
      this.adding.set(false);
    }
  }
}
