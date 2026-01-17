import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Availability, Product, ProductService } from './productService';

export type SortOption = 'newest' | 'priceAsc' | 'priceDesc' | 'nameAsc';

export type Category =
  | 'ALL'
  | 'Movilidad'
  | 'Higiene y Baño'
  | 'Descanso'
  | 'Ortopedia Técnica';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly productService = inject(ProductService);

  readonly searchTerm = signal<string>('');
  readonly selectedCategory = signal<Category>('ALL');

  readonly inStock = signal<boolean>(true);
  readonly backorder = signal<boolean>(true);

  readonly minPrice = signal<number>(0);
  readonly maxPrice = signal<number>(10000);

  readonly sort = signal<SortOption>('newest');

  readonly pageIndex = signal<number>(0);
  readonly pageSize = signal<number>(12);

  readonly products = this.productService.products;

  readonly filtered = computed<Product[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const cat = this.selectedCategory();
    const min = this.minPrice();
    const max = this.maxPrice();

    const allowInStock = this.inStock();
    const allowBackorder = this.backorder();

    return this.products().filter((p) => {

      if (cat !== 'ALL' && p.category !== cat) return false;

      const okAvailability =
        (allowInStock && p.availability === 'in_stock') ||
        (allowBackorder && p.availability === 'backorder');
      if (!okAvailability) return false;

      if (p.price < min || p.price > max) return false;

      if (term) {
        const haystack = `${p.name} ${p.description} ${p.category}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }

      return true;
    });
  });

  readonly totalFiltered = computed(() => this.filtered().length);

  readonly filteredSorted = computed<Product[]>(() => {
    const items = [...this.filtered()];
    const sort = this.sort();

    switch (sort) {
      case 'priceAsc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        items.sort((a, b) => a.name.localeCompare(b.name, 'es'));
        break;
      case 'newest':
      default:
        break;
    }
    return items;
  });

  readonly pageItems = computed<Product[]>(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredSorted().slice(start, end);
  });

  readonly totalPages = computed(() => {
    const size = this.pageSize();
    return size > 0 ? Math.max(1, Math.ceil(this.totalFiltered() / size)) : 1;
  });

  readonly showingText = computed(() => {
    const total = this.totalFiltered();
    if (total === 0) return 'Mostrando 0 de 0 artículos';
    const start = this.pageIndex() * this.pageSize() + 1;
    const end = Math.min(total, start + this.pageSize() - 1);
    return `Mostrando ${end - start + 1} de ${total} artículos`;
  });

  readonly categoryCounts = computed<Record<Category, number>>(() => {
    const counts: Record<Category, number> = {
      ALL: 0,
      'Movilidad': 0,
      'Higiene y Baño': 0,
      'Descanso': 0,
      'Ortopedia Técnica': 0,
    };
    const all = this.products();
    counts.ALL = all.length;
    for (const p of all) counts[p.category] += 1;
    return counts;
  });

  private readonly _resetPageOnChanges = effect(() => {
    this.searchTerm();
    this.selectedCategory();
    this.inStock();
    this.backorder();
    this.minPrice();
    this.maxPrice();
    this.sort();

    this.pageIndex.set(0);
  });

  setSearch(term: string) {
    this.searchTerm.set(term ?? '');
  }

  setCategory(cat: Category) {
    this.selectedCategory.set(cat);
  }

  toggleInStock(value: boolean) {
    this.inStock.set(!!value);
  }

  toggleBackorder(value: boolean) {
    this.backorder.set(!!value);
  }

  setPriceRange(min: number, max: number) {
    const safeMin = Number.isFinite(min) ? Math.max(0, min) : 0;
    const safeMax = Number.isFinite(max) ? Math.max(safeMin, max) : safeMin;
    this.minPrice.set(safeMin);
    this.maxPrice.set(safeMax);
  }

  setSort(sort: SortOption) {
    this.sort.set(sort);
  }

  setPage(pageIndex: number, pageSize?: number) {
    const safeSize = pageSize ?? this.pageSize();
    const size = Number.isFinite(safeSize) && safeSize > 0 ? Math.floor(safeSize) : 12;

    const maxPage = Math.max(0, Math.ceil(this.totalFiltered() / size) - 1);
    const index = Number.isFinite(pageIndex) ? Math.min(Math.max(0, Math.floor(pageIndex)), maxPage) : 0;

    this.pageSize.set(size);
    this.pageIndex.set(index);
  }

  nextPage() {
    this.setPage(this.pageIndex() + 1);
  }

  prevPage() {
    this.setPage(this.pageIndex() - 1);
  }

  resetAll() {
    this.searchTerm.set('');
    this.selectedCategory.set('ALL');
    this.inStock.set(true);
    this.backorder.set(true);
    this.minPrice.set(0);
    this.maxPrice.set(2000);
    this.sort.set('newest');
    this.pageIndex.set(0);
    this.pageSize.set(12);
  }
}
