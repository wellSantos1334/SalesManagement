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

  async list(): Promise<IUser[] | null> {
    const list = this.ormRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return list;
  }

  async update(data: IUser): Promise<IUser | null> {
    const user = this.ormRepository.save(data);

    return user;
  }

  async delete(id: number): Promise<IUser | unknown> {
    const user = this.ormRepository.delete({ id });

    return user;
  }
}
