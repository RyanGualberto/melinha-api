import { Server } from 'http';
interface NewOrderData {
    productId: string;
    quantity: number;
    userId: string;
}
export declare class OrdersGateway {
    server: Server;
    handleNewOrder(data: NewOrderData): void;
    handleUpdateOrder(data: NewOrderData): void;
}
export {};
