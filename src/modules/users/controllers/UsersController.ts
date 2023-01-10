import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ShowUserService from '../services/ShowUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, password2, avatar } = req.body;

    const createUser = new CreateUserService();

    if (password != password2) {
      throw new AppError('password dont match');
    }

    const newUser = await createUser.execute({
      name,
      email,
      password,
      avatar,
    });

    return res.status(200).json({ msg: 'User created sucessfull', newUser });
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUser = new ShowUserService();

    const user = await showUser.execute(parseInt(id));

    return res.status(200).json({ user });
  }
}