import { Component } from '@angular/core';
import { CatalogSearchBar } from '../../components/catalog/catalog-search-bar/catalog-search-bar';
import { CatalogSidebar } from '../../components/catalog/catalog-sidebar/catalog-sidebar';
import { CatalogToolbar } from '../../components/catalog/catalog-toolbar/catalog-toolbar';
import { ProductGrid } from '../../components/catalog/product-grid/product-grid';
import { CatalogPagination } from '../../components/catalog/catalog-pagination/catalog-pagination';

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
export class CatalogPage {

}
