export enum CustomerDocType {
    DNI = 'DNI',
    RUC = 'RUC'
}

export interface Customer {
    id: number;
    name: string;
    lastname: string;
    documentType: CustomerDocType;
    documentNumber: string;
    active: boolean;
}

export type SaveCustomer = Omit<Customer, 'id' | 'active'>;