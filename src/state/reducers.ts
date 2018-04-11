import {combineReducers} from 'redux'
import group from './group/group-reducers'
import restaurant from './restaurant/restaurant-reducers'
import user from './user/user-reducer'

export default combineReducers({
	group,
	restaurant,
	user,
});

