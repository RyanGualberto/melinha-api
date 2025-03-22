class OrderProductVariantDto {
  variantName: string;
  variantPrice: number;
}

class OrderProductDto {
  productObservation?: string;
  productId: string;
  quantity: number;
  price: number;
  variants: OrderProductVariantDto[];
}

export class CreateOrderDto {
  userId: string;
  addressId: string;
  products: OrderProductDto[];
  total: number;
  discount: number;
  deliveryCost: number;
  deliveryTime: number;
  paymentMethod: string;
  paymentChange?: number;
  addressSnapshot: string;
  userSnapshot: string;
  orderObservation?: string;
}
