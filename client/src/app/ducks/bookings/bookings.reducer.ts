import { Action } from '@ngrx/store';
import { types } from './bookings.types';

// Initial State values
export const initialState: any = {
    data: null,
    isLoading: false
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
export function bookingsReducer(state: any = initialState, action: Action) {
    switch (action.type) {
        case types.LIST_BOOKINGS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.LIST_BOOKINGS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.LIST_BOOKINGS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.GET_BOOKINGS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.GET_BOOKINGS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.GET_BOOKINGS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.CREATE_BOOKINGS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
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
                data: {}
            });
        case types.UPDATE_BOOKINGS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.UPDATE_BOOKINGS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.UPDATE_BOOKINGS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        default:
            return state;
    }
}
