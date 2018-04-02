import { Dispatch } from "react-redux";
import Network from "../../network";
import {ThunkAction} from 'redux-thunk'
import { ApplicationState } from "../reducers";

export enum GroupActions {
	ADD_GROUP = 'add-group',
	CHANGE_GROUP = 'change-group',
	REQUEST_GROUPS = 'request-groups',
	RECIEVE_GROUPS = 'recieve-groups',

}
export const changeGroup = (group: string) => ({
	type: GroupActions.CHANGE_GROUP,
	group
});

const requestAddGroup = () => ({
	type: GroupActions.ADD_GROUP
});

const requestGroups = () => ({
	type: GroupActions.REQUEST_GROUPS
});

const recieveGroups = (groups: Array<{name: string}>) => ({
	type: GroupActions.RECIEVE_GROUPS,
	groups
});

export function addGroup(data: {groupName: string, usersToAdd: string[]}): ThunkAction<void, ApplicationState, {}> {
	return (dispatch: Dispatch<ApplicationState>) => {
		dispatch(requestAddGroup());
		Network.socket.once('add-group', (data: {status: string}) => {
			// TODO: error handling.
			if(data.status === "ok") {
				console.log("OK!");
			} else {
				console.log("ERROR!");
			}
			dispatch(getUserGroups());
		});
		Network.socket.emit('add-group', data);
	}
}

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