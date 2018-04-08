import {GroupActions} from '../actions/group-actions'
import {Reducer} from 'redux'
import { AnyAction } from 'redux';
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
interface Action extends AnyAction {

	group: string,
	groups: Array<{name: string}>
}
export const GroupReducer: Reducer<GroupState> = (state = initialState, action) => {
	switch(action.type) {
		case GroupActions.CHANGE_GROUP: 
			return {
				...state,
				selected: action.group
			}
		case GroupActions.REQUEST_GROUPS:
		case GroupActions.ADD_GROUP:
			return {
				...state,
				isFetching: true
			}
		case GroupActions.RECIEVE_GROUPS:
			const newState = { 
				...state,
				isFetching: false
			};
			action.groups.mp((group: {name: string}) => {
				let found = newState.groups.find(oldGroup => oldGroup.name === group.name);
				if(!found) {
					newState.groups.push(group);
					return group;
				}
				return {...found, ...group};
			});
			return {
				...state,
				isFetching: false,
				groups: action.groups
			}
	}
	return state;
};
export default GroupReducer;