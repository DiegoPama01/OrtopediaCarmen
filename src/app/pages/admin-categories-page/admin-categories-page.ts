import { Component, effect, inject, signal } from '@angular/core';
import { AdminHeaderService } from '../../services/adminHeaderService';
import { CategoryService } from '../../services/categoryService';
import { CategoryItem } from '../../models/category';
import { ItemConfig } from '../../models/list.types';
import { AdminListShell } from '../../components/admin/admin-list/admin-list';
import { CategoryModalComponent } from '../../components/admin/category-modal/category-modal';

@Component({
  selector: 'app-admin-categories-page',
  standalone: true,
  imports: [AdminListShell, CategoryModalComponent],
  templateUrl: './admin-categories-page.html',
  styleUrl: './admin-categories-page.css',
})
export class AdminCategoriesPage {
  private header = inject(AdminHeaderService);
  readonly store = inject(CategoryService);

  readonly showModal = signal(false);
  readonly saving = signal(false);
  readonly editingCategory = signal<CategoryItem | null>(null);

  readonly config: ItemConfig<CategoryItem> = {
    searchPlaceholder: 'Buscar categorías…',
    columns: [
      { key: 'name', header: 'Nombre', field: 'name' },
      { key: 'description', header: 'Descripción', field: 'description' },
      { key: 'count', header: 'Productos', field: 'productsCount', align: 'right', widthClass: 'w-32' },
    ],
    actions: [
      { icon: 'edit', label: 'Editar', onClick: (r) => this.openEdit(r) },
      {
        icon: 'delete', label: 'Eliminar', tone: 'danger', onClick: (r) => {
          if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            this.store.remove(r.id);
          }
        }
      },
    ],
  };

  constructor() {
    effect(() => {
      this.header.setHeader({
        title: 'Gestión de Categorías',
        subtitle: 'Organiza los productos en categorías para facilitar la navegación.',
        ctaLabel: 'Añadir Nueva Categoría',
        onCta: () => this.openCreate(),
      });
    });
  }

  openCreate() {
    this.editingCategory.set(null);
    this.showModal.set(true);
  }

  openEdit(c: CategoryItem) {
    this.editingCategory.set(c);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingCategory.set(null);
  }

  async onSave(category: CategoryItem) {
    this.saving.set(true);
    try {
      if (category.id) {
        await this.store.update(category.id, category);
      } else {
        await this.store.create(category);
      }
      this.closeModal();
    } finally {
      this.saving.set(false);
    }
  }
}
