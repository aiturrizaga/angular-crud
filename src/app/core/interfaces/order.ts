import { Customer } from './customer';
import { Product } from './product';

export interface Order {
    id: number;
    customer: Customer;
    saleDate: Date;
    totalAmount: number;
    state: string;
    active: boolean;
    details: OrderDetail[];
}

export interface OrderDetail {
    id: number;
    product: Product;
    quantity: number;
    productPrice: number;
    total: number;
}

export interface SaveOrder {
    customerId: number;
    saleDate: Date;
}

export interface SaveOrderDetail {
    product: Product;
    quantity: number;
}