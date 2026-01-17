import { Component } from '@angular/core';
import { CatalogSearchBar } from '../../components/catalog-search-bar/catalog-search-bar';
import { CatalogSidebar } from '../../components/catalog-sidebar/catalog-sidebar';
import { CatalogToolbar } from '../../components/catalog-toolbar/catalog-toolbar';
import { ProductGrid } from '../../components/product-grid/product-grid';
import { CatalogPagination } from '../../components/catalog-pagination/catalog-pagination';

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
