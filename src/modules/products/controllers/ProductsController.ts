import { Request, Response } from 'express';
import { IProduct, IProductTakeId } from '../infra/interfaces/IProduct';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
  public async index(req: Request, res: Response) {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();

    return res.status(200).json(products);
  }

  public async show(req: Request<IProductTakeId>, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return res.json({ msg: 'Usuário criado com sucesso.', product });
  }

  public async update(req: Request<IProduct>, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return res.json({ msg: 'Usuário alterado com sucesso.', product });
  }

  public async delete(req: Request<IProductTakeId>, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = new DeleteProductService();

    const product = await deleteProduct.execute({
      id,
    });

    return res.status(200).json({ msg: 'Produto deletado com sucesso', product });
  }
}
