import { BasicUserData } from "../user/basic-user-data";
import { OrderItem } from "./order-item";

export interface OrderData {
    orderId?:number,
    userInfo?:BasicUserData,
    total?:number,
    finalTotal?:number,
    status?:string,
    createdAt?:string,
    orderItems?: OrderItem[]
}

