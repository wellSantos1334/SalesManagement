import { IUser } from '../infra/interfaces/IUser';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUserRepository } from '../interfaces/IUserRepository';

export default class ShowUserService {
  public async execute(id: number): Promise<IUser | null> {
    const userRepository: IUserRepository = new UserRepository();

    const user = await userRepository.findById(id);

    return user;
  }
}
