import AppError from '@shared/errors/AppError';
import { IUser } from '../infra/interfaces/IUser';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUserRepository } from '../interfaces/IUserRepository';

export default class ListUserService {
  public async execute(): Promise<IUser[] | null> {
    const userRepository: IUserRepository = new UserRepository();

    const list = await userRepository.list();

    if (!list) {
      throw new AppError('No one users registered');
    }

    return list;
  }
}
