import {LoadingTypes} from "./loadingTypes";
import {LoadingActionsType, START_LOADING, STOP_LOADING} from "./loadingActionsType";
import {withClientState} from "../client";






const initialState: LoadingTypes = {
    loading:false
}
export const LOADING_NAMESPACE = 'loading';

function loadingBaseReducer(state = initialState, action: LoadingActionsType) {

    switch (action.type) {
        case START_LOADING:
            return {loading:true}

        case STOP_LOADING:
            return {loading:false};
        default:
            return state;
    }
}

const loadingReducer = withClientState(loadingBaseReducer, LOADING_NAMESPACE);

export default loadingReducer;

