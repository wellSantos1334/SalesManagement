import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
// import { appDataSource } from '@shared/typeorm';

interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IProduct): Promise<Product> {
    const product = await ProductsRepository.findOneBy({ id: id });
    const productExists = await ProductsRepository.findByName(name);
    if (!product) {
      throw new AppError('Produto não encontrado.');
    }

    if (productExists && name != product.name) {
      throw new AppError('O nome informado já existe,');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
