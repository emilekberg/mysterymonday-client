
import {Reducer} from 'redux'
import { RestaurantActions } from '../actions/restaurant-actions';
export interface RestaurantState {
	all: Array<string>;
	isFetching: boolean
}
const initialState: RestaurantState = {
	all: [],
	isFetching: false
};
export const restaurantReducer: Reducer<RestaurantState> = (state = initialState, action) => {
	switch(action.type) {
		case RestaurantActions.REQUEST:
			return {
				...state,
				isFetching: true
			}
		case RestaurantActions.RECIEVE:
			return {
				...state,
				isFetching: false,
				all: action.data
			}
	}
	return state;
};
export default restaurantReducer;