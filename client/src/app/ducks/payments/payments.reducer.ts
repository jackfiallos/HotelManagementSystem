import { Action } from '@ngrx/store';
import { types } from './payments.types';

// Initial State values
export const initialState: any = {
    data: null,
    isLoading: false
};

/**
 * [paymentsReducer description]
 * @method  paymentsReducer
 * @author jackfiallos
 * @version [version]
 * @date    2017-10-28
 * @param   {any = initialState} state [description]
 * @param   {Action} action [description]
 * @return  {[type]} [description]
 */
export function paymentsReducer(state: any = initialState, action: Action) {
    switch (action.type) {
        case types.LIST_PAYMENTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.LIST_PAYMENTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.LIST_PAYMENTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.GET_PAYMENTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.GET_PAYMENTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.GET_PAYMENTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.CREATE_PAYMENTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.CREATE_PAYMENTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.CREATE_PAYMENTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.UPDATE_PAYMENTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.UPDATE_PAYMENTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.UPDATE_PAYMENTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        default:
            return state;
    }
}
