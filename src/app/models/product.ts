import { CategoryItem } from "./category";

export interface ProductItem {
    id: string;
    name: string;
    category: CategoryItem | null;
    description: string;
    quantity: number | 0;
    badges?: string[];
    price: number;
    imageUrl?: string;
}
