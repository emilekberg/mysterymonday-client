import group, {GroupState} from './group-reducers'
import restaurant, {RestaurantState} from './restaurant-reducers'
import {combineReducers} from 'redux'
import user, { UserState } from './user-reducer';

export interface ApplicationState {
	group: GroupState,
	restaurant: RestaurantState
	user: UserState
}

export default combineReducers({
	group,
	restaurant,
	user,
});

