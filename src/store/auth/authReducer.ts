import { AuthTypes } from './authTypes';
import { ADD_USER_LOGGED, AuthActionsType, REMOVE_USER_LOGGED } from './authActionsType';
import { IUserLogged } from '../../interfaces/user';
import { withClientState } from '../client';

function addUser(state: AuthTypes, userLogged: IUserLogged) {
    localStorage.setItem('access_token', userLogged.jwt);
    return { userLogged: userLogged };
}
function removeUser(state: AuthTypes) {
    localStorage.removeItem('access_token');
    return {
        userLogged: null,
    };
}

const initialState: AuthTypes = {
    userLogged: null,
};
export const AUTH_NAMESPACE = 'auth';

function authBaseReducer(state = initialState, action: AuthActionsType) {
    switch (action.type) {
        case ADD_USER_LOGGED:
            return addUser(state, action.userLogged);

        case REMOVE_USER_LOGGED:
            return removeUser(state);
        default:
            return state;
    }
}

const authReducer = withClientState(authBaseReducer, AUTH_NAMESPACE);

export default authReducer;
