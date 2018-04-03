import Network from "../../network";
import {Dispatch} from 'redux';
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../reducers";

export enum RestaurantActions {
	ADD = 'add-restaurant',
	ADD_RESPONSE = 'add-restaurant-response',
	REQUEST = 'request-restaurants',
	RECIEVE = 'recieve-restaurants'
}
const requestAddRestaurant = (name: string) => ({
	type: RestaurantActions.ADD,
	name
});

const responseAddRestaurant = () => ({
	type: RestaurantActions.ADD_RESPONSE,
});

const requestRestaurants = () => ({
	type: RestaurantActions.REQUEST
});

const recieveRestuarants = (data: Array<{name: string}>) => ({
	type: RestaurantActions.RECIEVE,
	data
});

export function addRestaurant(name: string) {
	return (dispatch: Dispatch<ApplicationState>) => {
		dispatch(requestAddRestaurant(name));
		Network.socket.once('add-restaurant', () => {
			dispatch(getRestaurants());
		});
		Network.socket.emit("add-restaurant", {
			name
		});
	}
}

export function getRestaurants(): ThunkAction<void, ApplicationState, void> {
	return (dispatch: Dispatch<ApplicationState>) => {
		dispatch(requestRestaurants());
		Network.socket.once('restaurants', (data: Array<{name: string}>) => {
			dispatch(recieveRestuarants(data));
		});
		Network.socket.emit('get-restaurants');
	}
}