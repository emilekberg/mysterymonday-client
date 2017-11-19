import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import Network from "../../network";
import GroupSelector from "../../components/group-selector";
import Header from "../../components/header";
import Loader from "../../components/loader";
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

		Network.socket.once("add-restaurant", () => {
			Network.socket.emit("restaurants-score");
		});
		Network.socket.once("restaurant-score", (data: Array<{name: string, average: number}>) => {
			this.setState({
				restaurants: data
			});
		});

	}

	public componentDidMount() {
		Network.socket.emit("get-restaurants-score");
	}

	public render() {
		return <div>
			<div>
				<h4>Add restaurant</h4>
				<input type="text" placeholder="restaurant name" name="inputName" onChange={this.onChange} />
				<button onClick={this.onSubmit}>submit</button>
			</div>
			<h4>Ratings</h4>
			<table>
				<thead>
					<tr>
						<th>restaurant name</th>
						<th>average score</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				{
					this.state.restaurants.map(({name, average}, i) => {
						return <tr key={i}>
							<td>{name}</td>
							<td>{average}</td>
							<td><Link to={`/restaurant?name=${name}`}>view</Link></td>
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
