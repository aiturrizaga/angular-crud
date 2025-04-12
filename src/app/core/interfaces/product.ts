export interface Product {
    id: number;
    name: string;
    sku: string;
    icon: string;
    group: string;
    subGroup: string;
    type: number;
    state: number;
    active: boolean;
}

export interface SaveProduct {
    name: string;
    description: string;
    imageUrl: string;
    currencyCode: string;
    price: string;
}
