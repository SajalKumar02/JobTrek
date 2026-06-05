import { HydratedDocument } from 'mongoose';

// Structure Define
export interface IUser {
  email: string;
  username: string;
  password: string;
}

// These are for responses
export type IUserPublic = Omit<IUser, 'password'>;

export type IUserUpdatePayload = Pick<IUser, 'username'>;

export type IUserUpdateEmail = Pick<IUser, 'email'>;

export type IUserUpdatePassword = Pick<IUser, 'password'>;

export type UserDocument = HydratedDocument<IUser>;
