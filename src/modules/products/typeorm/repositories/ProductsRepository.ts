import Product from '../entities/Product';
import { appDataSource } from '../../../../shared/typeorm/index';

export const ProductsRepository = appDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = await ProductsRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  },
});
