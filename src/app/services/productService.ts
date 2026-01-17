import { Injectable, computed, effect, signal } from '@angular/core';
import { ItemStore } from '../models/list.types';
import { ProductItem } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService implements ItemStore<ProductItem> {
  // MOCK DATA
  private readonly _items = signal<ProductItem[]>([
    {
      id: '1',
      name: 'Silla de Ruedas Ligera',
      sku: 'ORT-001',
      category: 'Movilidad',
      description: 'Estructura ligera de aluminio con motor de alto rendimiento.',
      price: 249,
      stock: 'in_stock',
      quantity: 10,
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBE1PVQV3fyduN-c-XY-6Mggpi-re24_i-pE1K7PyGInmhvBMquoYBUtnI1tvvgH0oKeweO5hIUJccwIJScaYw3O0ZNReiF8DsT1L8rjBFGmoOELSyplOezXztb_dHcbay7rKCWa3XnS_vIjGRq8PX67dCQIKGdkNeICXJSRcLw1yNoE70Wm03Y5Ph76RH_PGVABZb4l9R453wrlDEK7ALLfTEcsBNQpYNAS18G_TmHzGGZMtywM1utkT-A3D2FxZq6MW7wwimnj3El',
    },
    {
      id: '2',
      name: 'Muletas Ergonómicas Pro',
      sku: 'ORT-042',
      category: 'Movilidad',
      description: 'Frenos de seguridad progresivos y asiento ergonómico.',
      price: 45,
      stock: 'in_stock',
      quantity: 10,
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCTNWbREdW3IlVn7wqtty1-c5Vq3HLJSLrCe1N7SrnYoNu95fm1GaKBLrytvhCoZNLAwd2Ei66UGHV9AvjJqdnGUiIvL4SauTK2Mi3rr1AQ_wOVfiGvLNRTOI06KJ5m-BNxq-CwkPrz0hNLEGN3ZTrPSm_g2tP8JCt56HruEXO29e9URpb6HCIC5rAJc6rKmxP4iBUUGxlBBkpX5VXmk8S5EMb9AkGDG9bUW8eg2DExm3PhXSfQ9ZHGQrMCRvVPtOoyVimAFkGkebNB',
    },
    {
      id: '3',
      name: 'Faja Lumbar Reforzada',
      sku: 'ORT-115',
      category: 'Soportes',
      description: '4 planos de articulación eléctrica con control remoto.',
      price: 32.5,
      quantity: 10,
      stock: 'in_stock',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDo5RegbO7DUfOJWjwK8RnHvv9OgJp6hp8KImRZAYdaDwllHlNJ6iipe4zMA44YKhTC2PCSOwieC3y1OTAVHCGK_1f81OFtuR0_WswCJ46XJgrxjxLLc3SVbmzAG3yh2PHl0AG6U-1k64inbou8TDh7VSIZHRLuPq9Wu5hogosxKCvVN-G3j7oTM7xOlOPeokZywdVbPwGBdr8r3jG5RQK86jlAbGqWjgJzj23XCLmqh9C9ER5o55un8Bd7_j5Hz7vU8U_hOL1679NG',
    },
    {
      id: '4',
      name: 'Andador con Asiento Confort',
      sku: 'ORT-089',
      category: 'Movilidad',
      description: 'Diseño ultraligero para usuarios activos.',
      price: 89,
      quantity: 10,
      stock: 'backorder',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxWW7b4Dg28FQloD-Qy1RvAm4aEtGOubPHXfiJRIckycQ1JMXkfTu6d8uM5ydtgB-emEbBc0cPWjoS1Xc5-nGyL4_GQiJvH6DQb4zz1-dhlKCQ8wRTAnPMgef9U5DN0Trwhe1-fRPCqY62Cd6m1yA11UV_GrNHGd8jgBAsuoeerBV3QN74YVPr4hg29tQOq6Q5nAj0HnHU3Fn3ItZRg8fVA0dah5IdrS1gubEkbDwEw9irWPA5k9sIwpuM81xionLqgJErabqLGzpN',
    },
  ]);

  readonly items = this._items.asReadonly();

  readonly search = signal<string>('');
  readonly category = signal<string>('ALL'); // Keep category filter as it's relevant for products

  readonly pageIndex = signal<number>(0);
  readonly pageSize = signal<number>(10);

  // Helper to list available categories based on products
  readonly categories = computed<string[]>(() => {
    const set = new Set(this._items().map((i) => i.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'));
  });

  private readonly _filtered = computed<ProductItem[]>(() => {
    const term = this.search().trim().toLowerCase();
    const cat = this.category();

    return this._items().filter((p) => {
      if (cat !== 'ALL' && p.category !== cat) return false;
      if (!term) return true;
      const hay = `${p.name} ${p.sku}`.toLowerCase();
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
}
