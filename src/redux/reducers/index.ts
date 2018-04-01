import group from './group-reducers'
import restaurant from './restaurant-reducers'
import {combineReducers} from 'redux'

export default combineReducers({
	group, 
	restaurant
});