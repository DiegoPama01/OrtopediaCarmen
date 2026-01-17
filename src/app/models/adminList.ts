import { Signal } from '@angular/core';

export interface AdminItemStore<T> {
    search: Signal<string>;
    setSearch(value: string): void;

    total: Signal<number>;
    pageIndex: Signal<number>;
    totalPages: Signal<number>;
    pageItems: Signal<T[]>;
    rangeText: Signal<string>;

    setPage(index: number): void;
    nextPage(): void;
    prevPage(): void;

    rowId?: (item: T) => string;
}

export type RowId = string;

export type AdminAction<Row> = {
    icon: string;
    label: string;
    tone?: 'default' | 'danger';
    onClick: (row: Row) => void;
};

export type AdminColumn<Row> = {
    key: string;
    header: string;
    widthClass?: string;
    align?: 'left' | 'right';
    field?: keyof Row;
    value?: (row: Row) => string;
    kind?: 'text' | 'badge' | 'image';
};

export type AdminListConfig<Row> = {
    title?: string;
    searchPlaceholder?: string;

    selectFilter?: {
        labelAll: string;
        options: Signal<string[]>;
        value: Signal<string>;
        onChange: (v: string) => void;
    } | null;

    columns: AdminColumn<Row>[];
    actions?: AdminAction<Row>[];
};
