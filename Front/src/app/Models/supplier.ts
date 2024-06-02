import { Address } from "./address";

export interface Supplier {
    id: number;
    name: string;
    title: string;
    phone: string;
    address: Address;
}
