import AppError from '@shared/errors/AppError';
import { IUser } from '../infra/interfaces/IUser';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUserRepository } from '../interfaces/IUserRepository';

export default class DeleteUserService {
  public async execute(id: number): Promise<IUser | unknown> {
    const userRepository: IUserRepository = new UserRepository();

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    await userRepository.delete(user.id);

    return user;
  }
}
