import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemConfig, ItemStore } from '../../../models/list.types';

@Component({
  selector: 'app-admin-list-shell',
  standalone: true,
  templateUrl: './admin-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminListShell<Row extends Record<string, any>> {
  @Input({ required: true }) config!: ItemConfig<Row>;
  @Input({ required: true }) store!: ItemStore<Row>;

  trackRow = (_: number, row: Row) => this.store.rowId?.(row) ?? (row as any).id ?? row;
}
