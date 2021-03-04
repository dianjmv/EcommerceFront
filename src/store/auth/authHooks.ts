import { useAppAction, useAppSelector } from '../hooks';
import { AUTH_NAMESPACE } from './authReducer';
import { addUserLogged, removeUserLogged } from './authActions';

export const useUserLogged = () => useAppSelector(state => state[AUTH_NAMESPACE]);
export const useAddUser = () => useAppAction(addUserLogged);
export const useRemoveUserLogged = () => useAppAction(removeUserLogged);
