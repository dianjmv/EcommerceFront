import { ICategory } from '../interfaces/category';
import AuthRepository from '../api/authRepository';
import { toast } from 'react-toastify';
import { useAddUser } from '../store/auth/authHooks';
import { useRouter } from 'next/router';
import { IUser, IUserLogged } from '../interfaces/user';

export function isArrayOfStrings(value: any): value is string[] {
    if (!Array.isArray(value)) {
        return false;
    }
    return !value.map(x => typeof x !== 'string').includes(true);
}
