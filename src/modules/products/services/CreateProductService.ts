import AppError from '@shared/errors/AppError';
import { IsNull } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
// import { appDataSource } from '@shared/typeorm';

interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IProduct): Promise<Product> {
    const productExists = await ProductsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Produto já existe');
    }

    const product = ProductsRepository.create({
      name,
      price,
      quantity,
    });

    await ProductsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
