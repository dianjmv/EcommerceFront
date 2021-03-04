// third-party
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
// application
import rootReducer from './root/rootReducer';
import version from './version';
import { FirstArgType } from './types';
import { RootState } from './root/rootTypes';

export const save = (state: any) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const load = () => {
    if (!process.browser) {
        return undefined;
    }

    let state;

    try {
        state = localStorage.getItem('state');

        if (typeof state === 'string') {
            state = JSON.parse(state);
        }

        if (state && state.version !== version) {
            state = undefined;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return state || undefined;
};

// create a makeStore function
const makeStore: MakeStore<RootState> = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore);

export type GetServerSidePropsContext = FirstArgType<FirstArgType<typeof wrapper.getServerSideProps>>;
