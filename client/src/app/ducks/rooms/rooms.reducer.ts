import { Action } from '@ngrx/store';
import { types } from './rooms.types';

// Initial State values
export const initialState: any = {
    data: null,
    isLoading: false
};

/**
 * [roomsReducer description]
 * @method  roomsReducer
 * @author jackfiallos
 * @version [version]
 * @date    2017-10-28
 * @param   {any = initialState} state [description]
 * @param   {Action} action [description]
 * @return  {[type]} [description]
 */
export function roomsReducer(state: any = initialState, action: Action) {
    switch (action.type) {
        case types.LIST_ROOMS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.LIST_ROOMS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.LIST_ROOMS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.GET_ROOMS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.GET_ROOMS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.GET_ROOMS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.CREATE_ROOMS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.CREATE_ROOMS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.CREATE_ROOMS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.UPDATE_ROOMS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                data: {}
            });
        case types.UPDATE_ROOMS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        case types.UPDATE_ROOMS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                data: {}
            });
        default:
            return state;
    }
}
