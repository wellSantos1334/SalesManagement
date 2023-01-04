import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import ListProductService from '../services/ListProductService';
// import DeleteProductService from '../services/DeleteProductService';
// import ListProductService from '../services/ListProductService';
// import ShowProductService from '../services/ShowProductService';
// import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
  public async index(req: Request, res: Response) {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();

    return res.status(200).json(products);
  }

  // public async show(req: Request, res: Response): Promise<Response> {
  //   const id = parseInt(req.params.id);

  //   const showProduct = new ShowProductService();

  //   const product = await showProduct.execute({ id: id });

  //   return res.json(product);
  // }

  // public async create(req: Request, res: Response): Promise<Response> {
  //   const { name, price, quantity } = req.body;

  //   const createProduct = new CreateProductService();

  //   const product = await createProduct.execute({
  //     name,
  //     price,
  //     quantity,
  //   });

  //   return res.json({ msg: 'Usuário criado com sucesso.', product });
  // }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { name, price, quantity } = req.body;
  //   const id = parseInt(req.params.id);

  //   const updateProduct = new UpdateProductService();

  //   const product = await updateProduct.execute({
  //     id,
  //     name,
  //     price,
  //     quantity,
  //   });

  //   return res.json({ msg: 'Usuário alterado com sucesso.', product });
  // }

  // public async delete(req: Request, res: Response): Promise<any> {
  //   const id = parseInt(req.params.id);

  //   const deleteProduct = new DeleteProductService();

  //   await deleteProduct.execute({ id });

  //   return res.json('Produto deletado com sucesso.');
  // }
}
