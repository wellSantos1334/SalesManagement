import { IUserRepository } from '@modules/users/interfaces/IUserRepository';
import { appDataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import { IUser, IUserCreate } from '../../interfaces/IUser';
// import { IUserCreate, IUser } from '../../interfaces/IUser';
import User from '../entities/User';

export class UserRepository implements IUserRepository {
  ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = appDataSource.getRepository(User);
  }

  async findByName(name: string): Promise<IUser | null> {
    const user = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  async findById(id: number): Promise<IUser | null> {
    const user = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: IUserCreate): Promise<IUser> {
    const newUser = this.ormRepository.create(data);

    await this.ormRepository.save(newUser);

    return newUser;
  }
}
