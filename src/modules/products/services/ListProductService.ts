import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
// import { appDataSource } from '@shared/typeorm';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const product = await ProductsRepository.find();

    return product;
  }
}

export default ListProductService;
