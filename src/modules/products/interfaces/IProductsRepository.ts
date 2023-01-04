import { IProduct, IProductCreate } from '../infra/interfaces/IProduct';

export interface IProductsRepository {
  create(data: IProductCreate): Promise<IProduct>;
  findByName(name: string): Promise<IProduct | null>;
}
