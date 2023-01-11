export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export type IUserCreate = Omit<IUser, 'id'>;
export type IUserCreateSessions = Omit<IUser, 'id' | 'name' | 'avatar'>;
