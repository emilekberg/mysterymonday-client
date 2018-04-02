import Network from "../../network";
import {Dispatch} from 'redux';
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../reducers";

export enum RestaurantActions {
	REQUEST = 'request',
	RECIEVE = 'recieve'
}
const requestRestaurants = () => ({
	type: RestaurantActions.REQUEST
});

const recieveRestuarants = (data: Array<{name: string}>) => ({
	type: RestaurantActions.RECIEVE,
	data
});

export function getRestaurants(): ThunkAction<void, ApplicationState, void> {
	return (dispatch: Dispatch<ApplicationState>) => {
		dispatch(requestRestaurants());
		Network.socket.once('restaurants', (data: Array<{name: string}>) => {
			dispatch(recieveRestuarants(data));
		});
		Network.socket.emit('get-restaurants');
	}
}