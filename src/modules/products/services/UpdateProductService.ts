import AppError from '@shared/errors/AppError';
import { IProduct } from '../infra/interfaces/IProduct';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';
// import { appDataSource } from '@shared/typeorm';
class UpdateProductService {
  public async execute({ id, name, price, quantity }: IProduct): Promise<IProduct> {
    const productsRepository = new ProductsRepository();

    const product = await productsRepository.show(id);

    const productExists = await productsRepository.findByName(name);

    if (!product) {
      throw new AppError('Produto não encontrado.');
    }

    if (productExists && name != product.name) {
      throw new AppError('O nome informado já existe');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.update(product);

    return product;
  }
}

export default UpdateProductService;
