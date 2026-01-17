import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { ItemStore } from '../models/list.types';
import { ProductItem } from '../models/product';
import { SupabaseService } from './supabase-service';

@Injectable({ providedIn: 'root' })
export class ProductService implements ItemStore<ProductItem> {
  private readonly sb = inject(SupabaseService).client;
  private readonly _items = signal<ProductItem[]>([]);
  readonly items = this._items.asReadonly();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly search = signal<string>('');
  readonly category = signal<string>('ALL');
  readonly pageIndex = signal<number>(0);
  readonly pageSize = signal<number>(10);

  readonly categories = computed<string[]>(() => {
    const set = new Set(this._items().map((i) => i.category?.name ?? '').filter(n => !!n));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'));
  });

  private readonly _filtered = computed<ProductItem[]>(() => {
    const term = this.search().trim().toLowerCase();
    const cat = this.category();

    return this._items().filter((p) => {
      const catName = p.category?.name;
      if (cat !== 'ALL' && catName !== cat) return false;
      if (!term) return true;
      const hay = p.name.toLowerCase();
      return hay.includes(term);
    });
  });

  readonly total = computed(() => this._filtered().length);

  readonly totalPages = computed(() => {
    const size = this.pageSize();
    return Math.max(1, Math.ceil(this.total() / size));
  });

  readonly pageItems = computed<ProductItem[]>(() => {
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
    this.category();
    this.pageIndex.set(0);
  });

  constructor() {
    this.load();
  }

  setSearch(value: string): void {
    this.search.set(value ?? '');
  }

  setCategory(value: string): void {
    this.category.set(value ?? 'ALL');
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

  rowId = (item: ProductItem) => item.id;

  private normalizeImageUrl(url: any): string | undefined {
    if (!url) return undefined;
    if (typeof url === 'string') {
      // Check if it's a JSON string like "[\"https://...\"]"
      if (url.startsWith('[') && url.endsWith(']')) {
        try {
          const parsed = JSON.parse(url);
          return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : undefined;
        } catch {
          return url; // If parse fails, return as-is
        }
      }
      return url; // Already a plain string URL
    }
    if (Array.isArray(url) && url.length > 0) {
      return url[0]; // If somehow it's an actual array
    }
    return undefined;
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    const { data, error } = await this.sb
      .from('products')
      .select('*, category:categories(*)')
      .order('name', { ascending: true });

    if (error) {
      this.error.set(error.message);
      this.loading.set(false);
      return;
    }

    // Normalize imageUrl for all products
    const normalized = (data ?? []).map(p => ({
      ...p,
      imageUrl: this.normalizeImageUrl(p.imageUrl)
    }));

    this._items.set(normalized as ProductItem[]);
    this.loading.set(false);
  }

  async create(payload: Omit<ProductItem, 'id'>): Promise<ProductItem | null> {
    this.error.set(null);

    // Prepare payload for DB insertion
    // 1. Strip 'id' if it exists in payload (it's optional in interface but might be passed as "")
    // 2. Map category object to category ID (assuming column is 'category')
    const { id, category, ...rest } = payload as any; // Cast to any to access potentially present but typed-out props

    const dbPayload = {
      ...rest,
      category: category?.id ?? null
    };

    const { data, error } = await this.sb
      .from('products')
      .insert(dbPayload)
      .select('*, category:categories(*)') // Select with join to get full object back
      .single();

    if (error) {
      this.error.set(error.message);
      return null;
    }

    const created = {
      ...data,
      imageUrl: this.normalizeImageUrl(data.imageUrl)
    } as ProductItem;
    this._items.update((list) => [created, ...list]);
    return created;
  }

  async update(id: string, patch: Partial<Omit<ProductItem, 'id'>>): Promise<ProductItem | null> {
    this.error.set(null);

    // Prepare payload
    // Map category object to category ID if present in patch
    const { category, ...rest } = patch as any;

    const dbPayload: any = { ...rest };
    if (category !== undefined) {
      dbPayload.category = category?.id ?? null;
    }

    const { data, error } = await this.sb
      .from('products')
      .update(dbPayload)
      .eq('id', id)
      .select('*, category:categories(*)') // Select with join
      .single();

    if (error) {
      this.error.set(error.message);
      return null;
    }

    const updated = {
      ...data,
      imageUrl: this.normalizeImageUrl(data.imageUrl)
    } as ProductItem;
    this._items.update((list) => list.map((p) => (p.id === id ? updated : p)));
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    this.error.set(null);

    const { error } = await this.sb
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      this.error.set(error.message);
      return false;
    }

    this._items.update((list) => list.filter((p) => p.id !== id));
    return true;
  }
  async uploadImage(file: File): Promise<string | null> {
    this.error.set(null);
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '-')}`;

    // 1. Upload
    const { error: uploadError } = await this.sb.storage
      .from('products')
      .upload(fileName, file);

    if (uploadError) {
      this.error.set(uploadError.message);
      return null;
    }

    // 2. Get Public URL
    const { data } = this.sb.storage
      .from('products')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }
}
