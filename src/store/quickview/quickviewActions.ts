// application

import { IProduct } from '../../interfaces/product';
import {
    QUICKVIEW_CLOSE,
    QUICKVIEW_OPEN,
    QuickviewCloseAction,
    QuickviewOpenAction,
    QuickviewThunkAction,
} from './quickviewActionTypes';

let cancelPreviousRequest = () => {};

export function quickviewOpenSuccess(product: IProduct): QuickviewOpenAction {
    return {
        type: QUICKVIEW_OPEN,
        product,
    };
}

export function quickviewClose(): QuickviewCloseAction {
    return {
        type: QUICKVIEW_CLOSE,
    };
}

export function quickviewOpen(productSlug: string): QuickviewThunkAction<Promise<void>> {
    return dispatch => {
        cancelPreviousRequest();

        return new Promise(resolve => {
            let canceled = false;
            // sending request to server, timeout is used as a stub

            cancelPreviousRequest = () => {
                canceled = true;

                resolve();
            };
        });
    };
}
