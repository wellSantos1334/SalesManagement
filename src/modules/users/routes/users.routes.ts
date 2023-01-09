import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const userRouter = Router();
const userController = new UsersController();

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

export default userRouter;
