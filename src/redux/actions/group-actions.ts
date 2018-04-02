import { Dispatch } from "react-redux";
import Network from "../../network";
import {ThunkAction} from 'redux-thunk'
import { ApplicationState } from "../reducers";

export enum GroupActions {
	CHANGE_GROUP = 'change-group',
	REQUEST_GROUPS = 'request-groups',
	RECIEVE_GROUPS = 'recieve-groups',

}
export const changeGroup = (group: string) => ({
	type: GroupActions.CHANGE_GROUP,
	group
});

const requestGroups = () => ({
	type: GroupActions.REQUEST_GROUPS
});

const recieveGroups = (groups: Array<{name: string}>) => ({
	type: GroupActions.RECIEVE_GROUPS,
	groups
});

export function getUserGroups(): ThunkAction<void, ApplicationState, {}> {
	return (dispatch, getState) => {
		dispatch(requestGroups());
		Network.socket.once('user-groups', (data: Array<{name: string}>) => {
			dispatch(recieveGroups(data));
			const firstGroupInData = data.length > 0 ? data[0].name : '';
			const selectedFromState = getState().group.selected;
			const selectedGroup = !selectedFromState ? firstGroupInData : selectedFromState;
			if(selectedGroup !== selectedFromState) {
				dispatch(changeGroup(selectedGroup));
			}
		});
		Network.socket.emit('get-user-groups');
	}
}