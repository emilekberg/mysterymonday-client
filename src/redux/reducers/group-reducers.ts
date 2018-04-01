import {GroupActions} from '../actions/group-actions'
import {Reducer} from 'redux'
export interface GroupState {
	selected: string;
}
const initialState: GroupState = {
	selected: ''
};
export const groupReducer: Reducer<GroupState> = (state = initialState, action) => {
	switch(action.type) {
		case GroupActions.CHANGE_GROUP: 
			return {
				...state,
				selected: action.group
			}
	}
	return state;
};
export default groupReducer;