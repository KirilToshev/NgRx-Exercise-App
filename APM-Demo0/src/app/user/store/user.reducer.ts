import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../store/app.state';
import { User } from '../user';
import * as UserActions from './user.actions'

// State definition
const initialState: UserState = {
    maskUserName: false,
    currentUser: null
}

export interface State extends AppState.State {
    user: UserState
}

export interface UserState {
    maskUserName: boolean,
    currentUser: User
}

//Selectors

const getUserFeatureSelector = createFeatureSelector<UserState>('user');

export const getMaskUserNameSelector = createSelector(
    getUserFeatureSelector,
    userState => userState.maskUserName
);

export const getCurrentUserSelector = createSelector(
    getUserFeatureSelector,
    userState => userState.currentUser
);

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserActions.maskUserName,
        state => {
            return {
                ...state,
                maskUserName: !state.maskUserName
            }
        })
);