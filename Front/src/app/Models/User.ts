import { Address } from "./address";

// export interface User {
//   id: number;
//   name: string;
//   dateOfBirth: Date;
//   login: string;
//   password?: string;
//   cpf: string;
//   address: Address
// }

export interface User {
  id: number;
  title: string;
  name: string;
  phone: string;
  address: Address
  companyName: string;
  login: string;
  password?: string;
}