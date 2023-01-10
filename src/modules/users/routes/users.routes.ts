import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const userRouter = Router();
const userController = new UsersController();

// create user route
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(3),
      email: Joi.string().required().email().lowercase(),
      password: Joi.string().required().min(10).max(15),
      password2: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.one': '{{#label}} does not match' }),
      avatar: Joi.string().required(),
    },
  }),
  userController.create,
);

// find user by id
userRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  userController.findById,
);

// find all users
userRouter.get('/', userController.list);

export default userRouter;
