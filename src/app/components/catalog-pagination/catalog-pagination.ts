import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-catalog-pagination',
  imports: [],
  templateUrl: './catalog-pagination.html',
  styleUrl: './catalog-pagination.css',
})
export class CatalogPagination {
  @Input() currentPage = 1;
  @Input() totalPages = 1;

  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goTo(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  prev() {
    this.goTo(this.currentPage - 1);
  }

  next() {
    this.goTo(this.currentPage + 1);
  }
}
