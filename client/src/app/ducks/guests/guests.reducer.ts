import { Action } from '@ngrx/store';
import { types } from './guests.types';

// Initial State values
export const initialState: any = {
    data: null,
    isLoading: false
};

/**
 * [guestsReducer description]
 * @method  guestsReducer
 * @author jackfiallos
 * @version [version]
 * @date    2017-10-28
 * @param   {any = initialState} state [description]
 * @param   {Action} action [description]
 * @return  {[type]} [description]
 */
export function guestsReducer(state: any = initialState, action: Action) {
    switch (action.type) {
        case types.LIST_GUESTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.LIST_GUESTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.LIST_GUESTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.GET_GUESTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.GET_GUESTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.GET_GUESTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.CREATE_GUESTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.CREATE_GUESTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.CREATE_GUESTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.UPDATE_GUESTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.UPDATE_GUESTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.UPDATE_GUESTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        default:
            return state;
    }
}
