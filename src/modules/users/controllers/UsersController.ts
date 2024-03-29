import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { IUser } from '../infra/interfaces/IUser';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

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

  public async list(req: Request, res: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return res.status(200).json({ users });
  }

  public async update(req: Request<IUser>, res: Response): Promise<Response> {
    const { name, email, password, password2, avatar } = req.body;
    const { id } = req.params;
    const updateUser = new UpdateUserService();

    if (password != password2) {
      throw new AppError('password doesnt match');
    }

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
      avatar,
    });

    return res.status(200).json({ msg: 'User updated', user });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = new DeleteUserService();

    const deletedUser = await deleteUser.execute(parseInt(id));

    return res.status(200).json({ msg: 'Usuário deletado com sucesso.', deletedUser });
  }
}
