import { Address } from "./address"

export interface Supplier {
    idaddress:number
    companyName:string
    cuit:string
    phoneNumber:string
    email:String
    address:Address | Partial<Address>
}
