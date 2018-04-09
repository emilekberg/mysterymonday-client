import * as React from "react";
import { Link } from "react-router-dom";
import Network from "../../network";
import { Dispatch, connect, MapStateToProps } from "react-redux";
import { getRestaurants, addRestaurant } from '../../redux/actions/restaurant-actions'
import { ApplicationState } from "../../redux/reducers";
interface ManageRestaurantsState {
	inputName: string;
}
interface ManageRestaurantsProps {
	dispatch: Dispatch<ApplicationState>;
	restaurantsInGroup: Array<{name: string}>;
	allRestaurants: Array<{name: string}>;
}
const mapStateToProps: MapStateToProps<{},{}, ApplicationState> = (state: ApplicationState) => {
	return {
		allRestaurants: state.restaurant.all,
		restaurantsInGroup: []
	};
}
export class ManageRestaurants extends React.Component<ManageRestaurantsProps, ManageRestaurantsState> {
	state: ManageRestaurantsState = {
		inputName: ""
	};

	public componentWillMount() {
		this.props.dispatch(getRestaurants());
	}
 
	public render() {
		return <>
			<Link to="/home">back</Link>
			<h3>Manage Restaurants</h3>
			<div>
				Restaurants in group
				<ul>
				{
					this.props.restaurantsInGroup.map((value, i) => <li key={i}>
						<div>
							<span>{value.name}</span>
							<button>-</button>
						</div>
					</li>)
				}
				</ul>
			</div>
			<div>
				All Restaurants
				<ul>
				{
					this.props.allRestaurants.map((value, i) => <li key={i}>
						<div>
							<span>{value.name}</span>
							<button>+</button>
						</div>
					</li>)
				}
				</ul>
			</div>
			
			<h4>Add restaurant</h4>
			<input type="text" placeholder="restaurant name" name="inputName" onChange={this.onChange} />
			<button onClick={this.onSubmit}>submit</button>
		</>;
	}

	private onChange = (e: React.FormEvent<HTMLInputElement>) => {
		this.setState({
			inputName: e.currentTarget.value
		});
	}

	private onSubmit = () => {
		this.props.dispatch(addRestaurant(this.state.inputName));
		
	}
}
export default connect(
	mapStateToProps
)(ManageRestaurants);