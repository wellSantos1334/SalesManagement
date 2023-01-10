import AppError from '@shared/errors/AppError';
import { IUser } from '../infra/interfaces/IUser';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUserRepository } from '../interfaces/IUserRepository';

export default class UpdateUserService {
  public async execute(data: IUser): Promise<IUser | null> {
    const userRepository: IUserRepository = new UserRepository();

    const user = await userRepository.findById(data.id);
    const userNameExists = await userRepository.findByName(data.name);
    const userEmailExists = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    if (userNameExists && data.name != user.name) {
      throw new AppError('O nome informado já existe');
    }

    if (userEmailExists && data.email != user.email) {
      throw new AppError('O e-mail informado já existe');
    }

    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.avatar = data.avatar;

    await userRepository.update(user);

    return user;
  }
}
