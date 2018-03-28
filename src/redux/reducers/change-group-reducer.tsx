import {CHANGE_GROUP, ChangeGroupAction} from '../actions/change-group-action'
import {Action, Reducer} from 'redux'
interface GroupState {
	group: string;
}
const initialState: GroupState = {
	group: ''
};
export const changeGroupReducer: Reducer<GroupState> = (state = initialState, action: ChangeGroupAction) => {
	switch(action.type) {
		case CHANGE_GROUP: 
			return {
				...state,
				group: action.group
			}
	}
	return state;
};
export default changeGroupReducer;