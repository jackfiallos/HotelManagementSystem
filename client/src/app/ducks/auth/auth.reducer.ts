import { types } from './auth.types';

// Initial State values
export const initialState: any = {
    isLoading: false,
    lastUpdated: Date.now(),
    token: null,
    error: null
};

/**
 * [authReducer description]
 * @method  authReducer
 * @author jackfiallos
 * @version [version]
 * @date    2017-11-09
 * @param   {[type]} state [description]
 * @param   {[type]} action [description]
 * @return  {[type]} [description]
 */
export function authReducer(state: any = initialState, action: any) {
    switch (action.type) {
        // LOGIN
        case types.LOGIN_REQUEST:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                token: null,
                error: null
            });
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                token: action.payload,
                error: null
            });
        case types.LOGIN_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                token: null,
                error: action.error
            });
        default:
            return state;
    }
}
