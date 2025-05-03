export enum DocumentType {
    DNI = 'DNI',
    RUC = 'RUC'
}

export interface Customer {
    id: number;
    name: string;
    lastname: string;
    documentType: DocumentType;
    documentNumber: string;
    active: boolean;
}

export type SaveCustomer = Omit<Customer, 'id' | 'active'>;