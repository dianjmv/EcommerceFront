import { ImageBanner } from './imageBanner';

export interface IUser {
    last_name: string;
    id?: number;
    username: string;
    email: string;
    provider?: string;
    confirmed?: boolean;
    created_at?: string;
    updated_at?: string;
    first_name: string;
    phone_number?: string;
    avatar?: ImageBanner;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    last_name: string;
    username: string;
    email: string;
    first_name: string;
    password: string;
}
export interface IUserLogged {
    jwt: string;
    user: IUser;
}
