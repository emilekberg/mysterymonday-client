import { Dispatch } from "react-redux";
import Network from "../../network";
import {ThunkAction} from 'redux-thunk'
import { ApplicationState } from "../application-state";

export enum UserActions {
	REQUEST_USERS = 'request-users',
	RECIEVE_USERS = 'recieve-users',
}

const requestUsers = () => ({
	type: UserActions.REQUEST_USERS
});

const recieveUsers = (users: Array<{username: string}>) => ({
	type: UserActions.RECIEVE_USERS,
	users
});

export function getUsers(): ThunkAction<void, ApplicationState, {}> {
	return (dispatch, getState) => {
		dispatch(requestUsers());
		Network.socket.once('users', (users: Array<{username: string}>) => {
			dispatch(recieveUsers(users));
		});
		Network.socket.emit('get-users');
	}
}