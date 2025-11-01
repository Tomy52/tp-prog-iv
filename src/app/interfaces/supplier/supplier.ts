import { Address } from "./address";

export interface Supplier {
    id:number
    companyName:string
    cuit:string
    phoneNumber:string
    email:string
    address:Address | Partial<Address>
}
