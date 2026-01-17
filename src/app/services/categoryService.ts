import { Injectable, computed, effect, signal, inject } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { ItemStore } from '../models/list.types';
import { CategoryItem } from '../models/category';
import { ProductService } from './productService';

@Injectable({ providedIn: 'root' })
export class CategoryService implements ItemStore<CategoryItem> {
    private readonly productService = inject(ProductService);

    private readonly sb = inject(SupabaseService).client;

    readonly loading = signal(false);
    readonly error = signal<string | null>(null);

    private readonly _rawItems = signal<Omit<CategoryItem, 'productsCount'>[]>([]);

    async load(): Promise<void> {
        this.loading.set(true);
        this.error.set(null);

        const { data, error } = await this.sb
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            this.error.set(error.message);
            this.loading.set(false);
            return;
        }

        this._rawItems.set((data ?? []) as Omit<CategoryItem, 'productsCount'>[]);
        this.loading.set(false);
    }

    async create(payload: Omit<CategoryItem, 'id' | 'productsCount'>): Promise<CategoryItem | null> {
        this.error.set(null);

        // Sanitize payload: remove id if present (e.g. empty string) and productsCount
        const { id, productsCount, ...rest } = payload as any;

        const { data, error } = await this.sb
            .from('categories')
            .insert(rest)
            .select('*')
            .single();

        if (error) {
            this.error.set(error.message);
            return null;
        }
        const created = data as Omit<CategoryItem, 'productsCount'>;
        this._rawItems.update((list) => [created, ...list]);
        return { ...created, productsCount: 0 };
    }

    async update(id: string, patch: Partial<Omit<CategoryItem, 'id' | 'productsCount'>>): Promise<CategoryItem | null> {
        this.error.set(null);

        // Sanitize: remove id/productsCount if present
        const { id: _id, productsCount, ...rest } = patch as any;

        const { data, error } = await this.sb
            .from('categories')
            .update(rest)
            .eq('id', id)
            .select('*')
            .single();

        if (error) {
            this.error.set(error.message);
            return null;
        }
        const updated = data as Omit<CategoryItem, 'productsCount'>;
        this._rawItems.update((list) => list.map(c => c.id === id ? updated : c));
        return { ...updated, productsCount: 0 };
    }

    async remove(id: string): Promise<boolean> {
        this.error.set(null);
        const { error } = await this.sb.from('categories').delete().eq('id', id);
        if (error) {
            this.error.set(error.message);
            return false;
        }
        this._rawItems.update((list) => list.filter(c => c.id !== id));
        return true;
    }

    // ITEMS WITH COMPUTED COUNTS
    readonly items = computed<CategoryItem[]>(() => {
        const products = this.productService.items();
        const cats = this._rawItems();

        return cats.map((c) => ({
            ...c,
            productsCount: products.filter((p) => p.category?.name === c.name).length,
        }));
    });

    readonly search = signal<string>('');

    readonly pageIndex = signal<number>(0);
    readonly pageSize = signal<number>(10);

    private readonly _filtered = computed<CategoryItem[]>(() => {
        const term = this.search().trim().toLowerCase();

        return this.items().filter((c) => {
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

    constructor() {
        this.load();
    }
}
