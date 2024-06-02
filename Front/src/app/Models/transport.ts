import { Supplier } from "./supplier";
import { Category } from "./category";

export interface Transport {
  id: number;
  vehiclePlate: string;
  passengerCpf: string;
  dateHourTransport: string;
  transportKm: number;
  passenger?: Supplier;
  vehicle?: Category;
}
