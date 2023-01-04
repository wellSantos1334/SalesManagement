export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type IProductCreate = Omit<IProduct, 'id'>;
export type IProductTakeId = Omit<IProduct, 'name' | 'price' | 'quantity'>;
