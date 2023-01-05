import { IProductsRepository } from '@modules/products/interfaces/IProductsRepository';
import { appDataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import { IProductCreate, IProduct } from '../../interfaces/IProduct';
import Product from '../entities/Product';

// export const ProductsRepository = appDataSource.getRepository(Product).extend({
//   async findByName(name: string): Promise<Product | null> {
//     const product = await ProductsRepository.findOne({
//       where: {
//         name,
//       },
//     });
//     return product;
//   },
// });

export class ProductsRepository implements IProductsRepository {
  ormRepository: Repository<Product>;
  constructor() {
    this.ormRepository = appDataSource.getRepository(Product);
  }

  async create(data: IProductCreate): Promise<IProduct> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  async findByName(name: string): Promise<IProduct | null> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  async list(): Promise<IProduct[]> {
    const product = this.ormRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return product;
  }

  async show(id: number): Promise<IProduct | null> {
    const product = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return product;
  }

  async update({ id, name, price, quantity }: IProduct): Promise<IProduct> {
    const product = this.ormRepository.save({
      id,
      name,
      price,
      quantity,
    });

    return product;
  }

  async delete(id: number): Promise<IProduct | unknown> {
    const data = this.ormRepository.delete({ id });

    return data;
  }
}
