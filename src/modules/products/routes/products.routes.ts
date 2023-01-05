import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();

// list all products
productsRouter.get('/', productsController.index);

// find a product with id
productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  productsController.show,
);

// create new product
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(3),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

// update a specific product
productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required().min(3),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.update,
);

// delete a specific product
productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
