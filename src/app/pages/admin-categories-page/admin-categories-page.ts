import { Component, effect, inject } from '@angular/core';
import { AdminHeaderService } from '../../services/adminHeaderService';
import { CategoryService } from '../../services/categoryService';
import { CategoryItem } from '../../models/category';
import { ItemConfig } from '../../models/list.types';
import { AdminListShell } from '../../components/admin/admin-list/admin-list';

@Component({
  selector: 'app-admin-categories-page',
  standalone: true,
  imports: [AdminListShell],
  templateUrl: './admin-categories-page.html',
  styleUrl: './admin-categories-page.css',
})
export class AdminCategoriesPage {
  private header = inject(AdminHeaderService);

  readonly store = inject(CategoryService);

  readonly config: ItemConfig<CategoryItem> = {
    searchPlaceholder: 'Buscar categorías...',
    selectFilter: null,
    columns: [
      { key: 'name', header: 'Nombre', field: 'name' },
      { key: 'desc', header: 'Descripción', field: 'description' },
    ],
    actions: [
      { icon: 'edit', label: 'Editar', onClick: (r) => console.log('edit', r.id) },
      { icon: 'delete', label: 'Eliminar', tone: 'danger', onClick: (r) => console.log('delete', r.id) },
    ],
  };

  constructor() {
    effect(() => {
      this.header.setHeader({
        title: 'Gestión de Categorías',
        subtitle: 'Administra las categorías de productos de la tienda.',
        ctaLabel: 'Añadir Nueva Categoría',
        onCta: () => console.log('Abrir modal de crear categoría'),
      });
    });
  }
}
