export interface ICustomer {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: number;
    phone: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}