import { Action } from '@ngrx/store';
import { types } from './guests.types';

// Initial State values
export const initialState: any = {
    isLoading: false,
    lastUpdated: Date.now(),
    data: null,
};

/**
 * [guestsReducer description]
 * @method  guestsReducer
 * @author jackfiallos
 * @version [version]
 * @date    2017-10-30
 * @param   {any = initialState} state [description]
 * @param   {any} action [description]
 * @return  {[type]} [description]
 */
export function guestsReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case types.LIST_GUESTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.LIST_GUESTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: action.payload
            });
        case types.LIST_GUESTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.GET_GUESTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.GET_GUESTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.GET_GUESTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.CREATE_GUESTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.CREATE_GUESTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.CREATE_GUESTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_GUESTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_GUESTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_GUESTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        default:
            return state;
    }
}
