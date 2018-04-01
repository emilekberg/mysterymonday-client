import Network from "../../network";
import {Dispatch} from 'redux';

export enum RestaurantActions {
	REQUEST = 'request',
	RECIEVE = 'recieve'
}
export const requestRestaurants = () => ({
	type: RestaurantActions.REQUEST
});

export const recieveRestuarants = (data: Array<{name: string}>) => ({
	type: RestaurantActions.RECIEVE,
	data
});

export function fetchRestaurants() {
	return (dispatch: Dispatch<{}>) => {
		dispatch(requestRestaurants());
		Network.socket.once('restaurants', (data: Array<{name: string}>) => {
			dispatch(recieveRestuarants(data));
		});
		Network.socket.emit('get-restaurants');
	}
}