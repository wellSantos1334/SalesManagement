import AppError from '@shared/errors/AppError';
import { IProductCreate } from '../infra/interfaces/IProduct';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { IProductsRepository } from '../interfaces/IProductsRepository';
// import { appDataSource } from '@shared/typeorm';

interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IProductCreate): Promise<IProductCreate> {
    const productsRepository: IProductsRepository = new ProductsRepository();
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Produto já existe');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
