import { IUserLogged } from '../../interfaces/user';

export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export interface StartLoadingActionType {
    type: typeof START_LOADING;
}
export interface StopLoadingActionType {
    type: typeof STOP_LOADING;
}

export type LoadingActionsType = StartLoadingActionType | StopLoadingActionType;
