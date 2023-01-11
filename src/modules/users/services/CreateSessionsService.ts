import AppError from '@shared/errors/AppError';
import { IUser, IUserCreateSessions } from '../infra/interfaces/IUser';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import authConfig from '../../../config/auth';

interface IToken {
  user: IUser;
  token: string;
}

export default class CreateSessionsService {
  public async execute({ email, password }: IUserCreateSessions): Promise<IToken> {
    const userRepository: IUserRepository = new UserRepository();
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail ou senha incorreta.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('E-mail ou senha incorreta.', 401);
    }

    const userId = user.id;

    const token = jwt.sign({ userId }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expireIn,
    });

    return {
      user,
      token,
    };
  }
}
