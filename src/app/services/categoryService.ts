import { Injectable, computed, effect, signal, inject } from '@angular/core';
import { ItemStore } from '../models/list.types';
import { CategoryItem } from '../models/category';
import { ProductService } from './productService';

@Injectable({ providedIn: 'root' })
export class CategoryService implements ItemStore<CategoryItem> {
    private readonly productService = inject(ProductService);

    // RAW CATEGORIES (No counts)
    private readonly _rawItems = signal<Omit<CategoryItem, 'productsCount'>[]>([
        {
            id: 'c1',
            name: 'Movilidad',
            description: 'Sillas de ruedas, andadores y bastones',
        },
        {
            id: 'c2',
            name: 'Higiene y Baño',
            description: 'Elevadores, asideros y sillas de ducha',
        },
        {
            id: 'c3',
            name: 'Descanso',
            description: 'Camas articuladas y colchones antiescaras',
        },
        {
            id: 'c4',
            name: 'Ortopedia Técnica',
            description: 'Prótesis y órtesis a medida',
        },
    ]);

    // ITEMS WITH COMPUTED COUNTS
    private readonly _items = computed<CategoryItem[]>(() => {
        const products = this.productService.items();
        const cats = this._rawItems();

        return cats.map((c) => ({
            ...c,
            productsCount: products.filter((p) => p.category === c.name).length,
        }));
    });

    readonly search = signal<string>('');

    readonly pageIndex = signal<number>(0);
    readonly pageSize = signal<number>(10);

    private readonly _filtered = computed<CategoryItem[]>(() => {
        const term = this.search().trim().toLowerCase();

        return this._items().filter((c) => {
            if (!term) return true;
            const hay = `${c.name} ${c.description}`.toLowerCase();
            return hay.includes(term);
        });
    });

    readonly total = computed(() => this._filtered().length);

    readonly totalPages = computed(() => {
        const size = this.pageSize();
        return Math.max(1, Math.ceil(this.total() / size));
    });

    readonly pageItems = computed<CategoryItem[]>(() => {
        const start = this.pageIndex() * this.pageSize();
        return this._filtered().slice(start, start + this.pageSize());
    });

    readonly rangeText = computed(() => {
        const total = this.total();
        if (total === 0) return '0 - 0';
        const start = this.pageIndex() * this.pageSize() + 1;
        const end = Math.min(total, start + this.pageSize() - 1);
        return `${start} - ${end}`;
    });

    private readonly _resetPage = effect(() => {
        this.search();
        this.pageIndex.set(0);
    });

    setSearch(value: string): void {
        this.search.set(value ?? '');
    }

    setPage(index: number): void {
        const max = Math.max(0, this.totalPages() - 1);
        const safe = Number.isFinite(index) ? Math.floor(index) : 0;
        this.pageIndex.set(Math.min(Math.max(0, safe), max));
    }

    nextPage(): void {
        this.setPage(this.pageIndex() + 1);
    }

    prevPage(): void {
        this.setPage(this.pageIndex() - 1);
    }

    rowId = (item: CategoryItem) => item.id;
}
