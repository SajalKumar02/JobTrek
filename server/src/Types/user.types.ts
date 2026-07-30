import { HydratedDocument } from 'mongoose';
import { BaseResponse, ResponseStructure } from './api.types';

// Structure Define
export interface IUser {
  email: string;
  username: string;
  password: string;
}

// These are for responses
export interface IUserPublic {
  email: string;
  username: string;
}

export interface IUserUpdatePayload {
  username: string;
}

export interface IUserUpdateEmail {
  email: string;
}

export interface IUserUpdatePassword {
  password: string;
}

export interface UserDocument extends HydratedDocument<IUser> {}

interface UserResponseStructure extends ResponseStructure {
  user: UserDocument;
}

export interface UserResponse extends BaseResponse<UserResponseStructure> {}
