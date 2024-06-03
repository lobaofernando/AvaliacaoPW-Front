import { Supplier } from "./supplier";
import { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: number;
  inOrder: number;
  supplierId?: number;
  supplier?: Supplier;
  categoryId?: number;
  category?: Category;
}
