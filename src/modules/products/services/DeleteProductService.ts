import AppError from '@shared/errors/AppError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
// import { appDataSource } from '@shared/typeorm';

interface IProduct {
  id: number;
}

class DeleteProductService {
  public async execute({ id }: IProduct): Promise<any> {
    const product = await ProductsRepository.findOneBy({ id: id });

    if (!product) {
      throw new AppError('Produto não encontrado.');
    }

    await ProductsRepository.remove(product);
  }
}

export default DeleteProductService;
