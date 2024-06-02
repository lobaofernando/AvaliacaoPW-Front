import { Address } from "./address";

export interface Employee {
  id: number;
  title: string;
  name: string;
  phone: string;
  companyName: string;
  birthDate: string;
  hireDate: string;
  homePhone: string;
  extension: string;
  address: Address;
}
