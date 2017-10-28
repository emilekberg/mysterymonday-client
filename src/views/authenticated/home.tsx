import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import Network from "../../network";
interface HomeState {
	restaurants: Array<{
		name: string
	}>;
	inputName: string;
}
export default class Home extends React.Component<RouteComponentProps<any>, HomeState> {
	private validateUsername = /[\S]{3,}/;
	private validatePassword = /[\S]{8,}/;
	constructor() {
		super();
		this.state = {
			restaurants: [],
			inputName: ""
		};

		Network.socket.on("add-restaurant", () => {
			Network.socket.emit("get-restaurants");
		});
		Network.socket.on("restaurants", (data: Array<{name: string}>) => {
			this.setState({
				restaurants: data
			});
		});
	}

	public componentWillMount() {
		Network.socket.emit("get-restaurants");
	}

	public render() {
		return <div>
			Welcome mr!
			<div>
			<input type="text" placeholder="restaurant name" name="inputName" onChange={this.onChange} />
			<button onClick={this.onSubmit}>submit</button>

			</div>
			<ul>
				{
					this.state.restaurants.map((restaurant, i) => {
						return <li key={i}>{restaurant.name}</li>;
					})
				}
			</ul>
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
