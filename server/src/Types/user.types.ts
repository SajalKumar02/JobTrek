export interface IUser {
    email: string;
    username: string;
    password: string;
}

export type IUserUpdatePayload = Pick<IUser, 'username'>

export type IUserUpdateEmail = Pick<IUser, 'email'>

export type IUserUpdatePassword = Pick<IUser, 'password'>