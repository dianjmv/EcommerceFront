import { IUserLogged } from '../../interfaces/user';
import {
    ADD_USER_LOGGED,
    AddUserLoggedActionType,
    REMOVE_USER_LOGGED,
    RemoveUserLoggedActionType,
} from './authActionsType';

export function addUserLogged(user: IUserLogged): AddUserLoggedActionType {
    return {
        type: ADD_USER_LOGGED,
        userLogged: user,
    };
}

export function removeUserLogged(): RemoveUserLoggedActionType {
    return {
        type: REMOVE_USER_LOGGED,
    };
}
