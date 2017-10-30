import { Action } from '@ngrx/store';
import { types } from './bookings.types';

// Initial State values
export const initialState: any = {
    isLoading: false,
    lastUpdated: Date.now(),
    data: null,
};

/**
 * [bookingsReducer description]
 * @method  bookingsReducer
 * @author jackfiallos
 * @version [version]
 * @date    2017-10-28
 * @param   {any = initialState} state [description]
 * @param   {Action} action [description]
 * @return  {[type]} [description]
 */
export function bookingsReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case types.LIST_BOOKINGS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.LIST_BOOKINGS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: action.payload
            });
        case types.LIST_BOOKINGS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.GET_BOOKINGS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.GET_BOOKINGS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.GET_BOOKINGS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.CREATE_BOOKINGS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.CREATE_BOOKINGS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.CREATE_BOOKINGS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_BOOKINGS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_BOOKINGS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_BOOKINGS_FAILURE:
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
