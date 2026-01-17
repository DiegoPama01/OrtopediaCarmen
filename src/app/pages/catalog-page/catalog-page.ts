import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogSearchBar } from '../../components/catalog/catalog-search-bar/catalog-search-bar';
import { CatalogSidebar } from '../../components/catalog/catalog-sidebar/catalog-sidebar';
import { CatalogToolbar } from '../../components/catalog/catalog-toolbar/catalog-toolbar';
import { ProductGrid } from '../../components/catalog/product-grid/product-grid';
import { CatalogPagination } from '../../components/catalog/catalog-pagination/catalog-pagination';
import { CatalogService } from '../../services/catalogService';

@Component({
  selector: 'app-catalog-page',
  imports: [
    CatalogSearchBar,
    CatalogSidebar,
    CatalogToolbar,
    ProductGrid,
    CatalogPagination
  ],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
})
export class CatalogPage implements OnInit {
  private route = inject(ActivatedRoute);
  private catalog = inject(CatalogService);

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
