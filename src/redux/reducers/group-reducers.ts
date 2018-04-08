import {GroupActions} from '../actions/group-actions'
import {Reducer} from 'redux'
import { tryParseJson } from '../../utils';
export interface GroupState {
	selected: string;
	isFetching: boolean;
	groups: Array<{name: string}>
}
const storedState = tryParseJson<GroupState>(localStorage.getItem('group-state'));

const initialState: GroupState = storedState || {
	selected: '',
	isFetching: false,
	groups: []
};

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
			const groups = action.groups.map((group: {name: string}) => {
				let found = state.groups.find(oldGroup => oldGroup.name === group.name);
				if(!found) {
					state.groups.push(group);
					return group;
				}
				return {...found, ...group};
			});
			return {
				...state,
				isFetching: false,
				groups
			}
	}
	return state;
};
export default GroupReducer;