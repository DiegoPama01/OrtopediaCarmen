import { Signal } from '@angular/core';

export type AdminItemAction<T> = {
    icon: string;
    label: string;
    tone?: 'default' | 'danger';
    onClick(item: T): void;
};

export type AdminItemColumn<T> = {
    key: string;
    header: string;
    widthClass?: string;
    align?: 'left' | 'right';
    field?: keyof T;
    value?: (item: T) => string;
    kind?: 'text' | 'badge' | 'image';
};

export type AdminItemConfig<T> = {
    searchPlaceholder?: string;

    selectFilter?: {
        labelAll: string;
        options: Signal<string[]>;
        value: Signal<string>;
        onChange(value: string): void;
    } | null;

    columns: AdminItemColumn<T>[];
    actions?: AdminItemAction<T>[];
};
