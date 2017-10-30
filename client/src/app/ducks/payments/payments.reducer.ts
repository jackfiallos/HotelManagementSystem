import { Action } from '@ngrx/store';
import { types } from './payments.types';

// Initial State values
export const initialState: any = {
    isLoading: false,
    lastUpdated: Date.now(),
    data: null,
};

/**
 * [paymentsReducer description]
 * @method  paymentsReducer
 * @author jackfiallos
 * @version [version]
 * @date    2017-10-28
 * @param   {any = initialState} state [description]
 * @param   {any} action [description]
 * @return  {[type]} [description]
 */
export function paymentsReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case types.LIST_PAYMENTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.LIST_PAYMENTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: action.payload
            });
        case types.LIST_PAYMENTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.GET_PAYMENTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.GET_PAYMENTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.GET_PAYMENTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.CREATE_PAYMENTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.CREATE_PAYMENTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.CREATE_PAYMENTS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_PAYMENTS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_PAYMENTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_PAYMENTS_FAILURE:
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
