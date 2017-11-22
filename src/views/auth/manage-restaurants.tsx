import * as React from "react";
import { Link } from "react-router-dom";
import Network from "../../network";
interface ManageRestaurantsState {
	inputName: string;
	restaurants: Array<{name: string}>;
}
export default class ManageRestaurants extends React.Component<any, ManageRestaurantsState> {
	constructor() {
		super();
		this.state = {
			inputName: "",
			restaurants: []
		};
	}

	public componentWillMount() {
		Network.socket.on("add-restaurant", () => {
			Network.socket.emit("get-restaurants");
		});
		Network.socket.on("restaurants", (data: Array<{name: string}>) => {
			this.setState({
				restaurants: data
			});
		});
		Network.socket.emit("get-restaurants");
	}

	public componentWillUnmount() {
		Network.socket.removeEventListener("add-restaurant");
		Network.socket.removeEventListener("restaurants");
	}

	public render() {
		return <div>
			<Link to="/home">back</Link>
			<h3>Manage Restaurants</h3>
			<ul>
				{
					this.state.restaurants.map((value, i) => <li key={i}>{value.name}</li>)
				}
			</ul>
			<h4>Add restaurant</h4>
			<input type="text" placeholder="restaurant name" name="inputName" onChange={this.onChange} />
			<button onClick={this.onSubmit}>submit</button>
		</div>;
	}

	private onChange = (e: React.FormEvent<HTMLInputElement>) => {
		this.setState({
			inputName: e.currentTarget.value
		});
	}

	private onSubmit = () => {
		Network.socket.emit("add-restaurant", {
			name: this.state.inputName
		});
	}
}
