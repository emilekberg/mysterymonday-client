import group, {GroupState} from './group-reducers'
import restaurant, {RestaurantState} from './restaurant-reducers'
import {combineReducers} from 'redux'

export interface ApplicationState {
	group: GroupState,
	restaurant: RestaurantState
}

export default combineReducers({
	group, 
	restaurant
});

