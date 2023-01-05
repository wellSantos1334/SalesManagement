import AppError from '@shared/errors/AppError';
import { IProductTakeId } from '../infra/interfaces/IProduct';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';
// import { appDataSource } from '@shared/typeorm';

export default class DeleteProductService {
  public async execute({ id }: IProductTakeId): Promise<IProductTakeId> {
    const productsRepository = new ProductsRepository();
    const product = await productsRepository.show(id);

    if (!product) {
      throw new AppError('Produto não encontrado!');
    }

    await productsRepository.delete(product.id);

    return product;
  }
}
