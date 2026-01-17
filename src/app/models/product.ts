export interface ProductItem {
    id: string;
    name: string;
    sku: string;
    category: string;
    description: string;
    quantity: number | 0;
    badges?: string[];
    availability?: 'in_stock' | 'backorder';
    price: number;
    stock: 'in_stock' | 'backorder';
    imageUrl?: string;
}
