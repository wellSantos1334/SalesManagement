import { IUser, IUserCreate } from '../infra/interfaces/IUser';

export interface IUserRepository {
  // create(data: IUserCreate): Promise<IUser>;
  findByName(name: string): Promise<IUser | null>;
  findById(id: number): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(data: IUserCreate): Promise<IUser>;
  list(): Promise<IUser[] | null>;
}
