import AppError from '@shared/errors/AppError';
import { IUser, IUserCreate } from '../infra/interfaces/IUser';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';
export default class CreateUserService {
  public async execute({ name, email, password, avatar }: IUserCreate): Promise<IUser> {
    const userRepository = new UserRepository();
    const userExistsByName = await userRepository.findByName(name);
    const userExistsByEmail = await userRepository.findByEmail(email);

    if (userExistsByName) {
      throw new AppError('Username already exists');
    }

    if (userExistsByEmail) {
      throw new AppError('Email already exists');
    }

    const newUser = userRepository.create({
      name,
      email,
      password,
      avatar,
    });

    return newUser;
  }
}
