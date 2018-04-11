import {GroupState} from './group/group-reducers'
import {RestaurantState} from './restaurant/restaurant-reducers'
import { UserState } from './user/user-reducer';
export interface ApplicationState {
	group: GroupState,
	restaurant: RestaurantState
	user: UserState
}