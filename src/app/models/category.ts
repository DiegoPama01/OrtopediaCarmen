export interface Category {
    icon: string;
    title: string;
    description: string;
    link: string;
}

export interface CategoryItem {
    id: string;
    name: string;
    description: string;
    productsCount: number;
}
