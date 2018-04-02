import {GroupActions} from '../actions/group-actions'
import {Reducer} from 'redux'
export interface GroupState {
	selected: string;
	isFetching: boolean;
	groups: Array<{name: string}>
}
const initialState: GroupState = {
	selected: '',
	isFetching: false,
	groups: []
};
export const groupReducer: Reducer<GroupState> = (state = initialState, action) => {
	switch(action.type) {
		case GroupActions.CHANGE_GROUP: 
			return {
				...state,
				selected: action.group
			}
		case GroupActions.REQUEST_GROUPS:
			return {
				...state,
				isFetching: true
			}
		case GroupActions.RECIEVE_GROUPS:
			return {
				...state,
				isFetching: false,
				groups: action.groups
			}
	}
	return state;
};
export default groupReducer;