export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    currencyCode: string;
    price: number;
    state: number;
    active: boolean;
}

export interface SaveProduct {
    name: string;
    description: string;
    imageUrl: string;
    currencyCode: string;
    price: number;
}
