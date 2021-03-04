import {IUserLogged} from "../../interfaces/user";

export const ADD_USER_LOGGED='ADD_USER_LOGGED'
export const REMOVE_USER_LOGGED = 'REMOVE_USER_LOGGED'
export interface AddUserLoggedActionType{
    type: typeof ADD_USER_LOGGED;
    userLogged: IUserLogged
}
export interface RemoveUserLoggedActionType{
    type: typeof REMOVE_USER_LOGGED;
}

export type AuthActionsType=AddUserLoggedActionType|RemoveUserLoggedActionType

