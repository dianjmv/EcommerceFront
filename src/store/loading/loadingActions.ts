import { START_LOADING, StartLoadingActionType, STOP_LOADING, StopLoadingActionType } from './loadingActionsType';

export function startLoading(): StartLoadingActionType {
    return {
        type: START_LOADING,
    };
}

export function stopLoading(): StopLoadingActionType {
    return {
        type: STOP_LOADING,
    };
}
