import {useAppAction, useAppSelector} from "../hooks";
import {LOADING_NAMESPACE} from "./loadingReducer";
import {startLoading, stopLoading} from "./loadingActions";


export const useLoadingState = () => useAppSelector((state) => state[LOADING_NAMESPACE]);
export const useStartLoading = () => useAppAction(startLoading);
export const useStopLoading = ()=> useAppAction(stopLoading);
