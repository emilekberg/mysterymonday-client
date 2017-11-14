import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import Network from "../../network";
interface HomeState {
	restaurants: Array<{
		name: string,
		average: number
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
			Network.socket.emit("restaurants-score");
		});
		Network.socket.on("restaurant-score", (data: Array<{name: string, average: number}>) => {
			this.setState({
				restaurants: data
			});
		});
	}

	public componentWillMount() {
		Network.socket.emit("get-restaurants-score", {
			name: ""
		});
	}

	public render() {
		return <div>
			Welcome mr!
			<div>
			<input type="text" placeholder="restaurant name" name="inputName" onChange={this.onChange} />
			<button onClick={this.onSubmit}>submit</button>

			</div>
			<table>
				<thead>
					<tr>
						<th>restaurant name</th><th>average score</th>
					</tr>
				</thead>
				<tbody>
				{
					this.state.restaurants.map((restaurant, i) => {
						return <tr key={i}>
							<td>{restaurant.name}</td>
							<td>{restaurant.average}</td>
						</tr>;
					})
				}
				</tbody>
			</table>
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
