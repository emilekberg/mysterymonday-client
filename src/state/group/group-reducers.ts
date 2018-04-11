import {GroupActions} from './group-actions'
import {Reducer} from 'redux'
import { tryParseJson } from '../../utils';
export interface RestaurantData {
	visited: boolean;
}
export interface GroupData {
	name: string;
	members: string[];
	restaurants: Array<RestaurantData>
}
export interface GroupState {
	selected: string;
	isFetching: boolean;
	names: string[];
	data: {[key: string]: GroupData}
}
const storedState = tryParseJson<GroupState>(localStorage.getItem('group-state'));

const initialState: GroupState = storedState || {
	selected: '',
	isFetching: false,
	names: [],
	data: {}
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
			const {names} = action;
			return {
				...state,
				isFetching: false,
				names
			};
	}
	return state;
};
export default GroupReducer;