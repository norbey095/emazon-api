import { Brand } from "./brand";
import { Category } from "./category";

export interface Article{
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    idbrand: number;
    categories: number[];
}

export interface ArticleList{
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    brand: Brand;
    categories: Category[];
}