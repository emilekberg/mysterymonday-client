import {UserActions} from '../actions/user-actions'
import {Reducer} from 'redux'
import { GroupActions } from '../actions/group-actions';
export interface UserState {
	selected: string;
	isFetching: boolean;
	users: Array<{username: string}>
}
const initialState: UserState = {
	selected: '',
	isFetching: false,
	users: []
};
export const userReducer: Reducer<UserState> = (state = initialState, action) => {
	switch(action.type) {
		case UserActions.REQUEST_USERS:
			return {
				...state,
				isFetching: true
			}
		case UserActions.RECIEVE_USERS:
			return {
				...state,
				isFetching: false,
				users: action.users
			}
	}
	return state;
};
export default userReducer;