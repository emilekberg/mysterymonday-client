import {CHANGE_GROUP} from '../actions/change-group-action'
import {Reducer} from 'redux'
interface GroupState {
	group: string;
}
const initialState: GroupState = {
	group: ''
};
export const changeGroupReducer: Reducer<GroupState> = (state = initialState, action) => {
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