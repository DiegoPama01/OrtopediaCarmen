import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductGrid } from '../../components/catalog/product-grid/product-grid';
import { CatalogSidebar } from '../../components/catalog/catalog-sidebar/catalog-sidebar';
import { CatalogToolbar } from '../../components/catalog/catalog-toolbar/catalog-toolbar';
import { CatalogPagination } from '../../components/catalog/catalog-pagination/catalog-pagination';
import { CatalogSearchBar } from '../../components/catalog/catalog-search-bar/catalog-search-bar';
import { CatalogService } from '../../services/catalogService';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    ProductGrid,
    CatalogSidebar,
    CatalogToolbar,
    CatalogPagination,
    CatalogSearchBar,
  ],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPage implements OnInit {
  private route = inject(ActivatedRoute);
  readonly catalog = inject(CatalogService);
  showFilters = signal(false);

  toggleFilters() {
    this.showFilters.set(!this.showFilters());
  }

  ngOnInit() {
    // Check if there's a category query parameter
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.catalog.setCategory(category);
      }
    });
  }
}
