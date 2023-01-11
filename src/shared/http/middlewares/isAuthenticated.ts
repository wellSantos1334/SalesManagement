import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';

interface ITokenPayload {
  userId: number;
  iat: number;
  exp: number;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token está faltando.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { userId } = decodedToken as ITokenPayload;

    req.user = {
      id: userId,
    };

    return next();
  } catch {
    throw new AppError('JWT Token inválido.');
  }
}
