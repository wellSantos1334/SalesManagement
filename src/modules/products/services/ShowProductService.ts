// import Product from '../typeorm/entities/Product';
import { IProductTakeId } from '../infra/interfaces/IProduct';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';
// import { appDataSource } from '@shared/typeorm';
class ShowProductService {
  public async execute({ id }: IProductTakeId): Promise<IProductTakeId | null> {
    const productRepository = new ProductsRepository();

    const product = await productRepository.show(id);

    return product;
  }
}

export default ShowProductService;
