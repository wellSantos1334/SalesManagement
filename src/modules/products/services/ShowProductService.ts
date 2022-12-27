import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
// import { appDataSource } from '@shared/typeorm';

interface IProduct {
  id: number;
}

class ShowProductService {
  public async execute({ id }: IProduct): Promise<Product | null> {
    const product = await ProductsRepository.findOneBy({ id: id });

    return product;
  }
}

export default ShowProductService;
