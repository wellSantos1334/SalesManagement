import AppError from '@shared/errors/AppError';
import { IProduct } from '../infra/interfaces/IProduct';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';
// import { appDataSource } from '@shared/typeorm';

class ListProductService {
  public async execute(): Promise<IProduct[]> {
    const productsRepository = new ProductsRepository();
    const product = await productsRepository.list();

    if (!product) {
      throw new AppError('No one product registred.');
    }

    return product;
  }
}

export default ListProductService;
