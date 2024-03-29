import AppError from '@shared/errors/AppError';
import { IUser, IUserCreate } from '../infra/interfaces/IUser';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { hash } from 'bcryptjs';
export default class CreateUserService {
  public async execute({ name, email, password, avatar }: IUserCreate): Promise<IUser> {
    const userRepository: IUserRepository = new UserRepository();
    const userExistsByName = await userRepository.findByName(name);
    const userExistsByEmail = await userRepository.findByEmail(email);

    if (userExistsByName) {
      throw new AppError('Username already exists');
    }

    if (userExistsByEmail) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    return newUser;
  }
}
