declare class OrderProductVariantDto {
    variantName: string;
    variantPrice: number;
}
declare class OrderProductDto {
    productObservation?: string;
    productId: string;
    quantity: number;
    price: number;
    variants: OrderProductVariantDto[];
}
export declare class CreateOrderDto {
    userId: string;
    addressId?: string;
    products: OrderProductDto[];
    total: number;
    discount: number;
    deliveryCost: number;
    paymentMethod: string;
    paymentChange?: number;
    addressSnapshot?: string;
    userSnapshot: string;
    orderObservation?: string;
    isWithdrawal?: boolean;
}
export {};
