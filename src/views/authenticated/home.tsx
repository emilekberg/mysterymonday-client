import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import Network from "../../network";
interface HomeState {
	restaurants: Array<{
		name: string,
		average: number
	}>;
	selectedGroup: string;
	groups: Array<{
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
			selectedGroup: "",
			groups: [],
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
		Network.socket.on("user-groups", (data: Array<{name: string}>) => {
			const selectedGroup = data.length > 0 ? data[0].name : "";
			this.setState({
				groups: data,
				selectedGroup: !this.state.selectedGroup ? selectedGroup : this.state.selectedGroup
			});
		});
	}

	public componentDidMount() {
		Network.socket.emit("get-restaurants-score", {
			name: ""
		});
		Network.socket.emit("get-user-groups");
	}

	public render() {
		return <div>
			<h3>Hello {Network.name}!</h3>
			<div>
				<span>Selected Group: </span>
				<select defaultValue={this.state.selectedGroup} onChange={this.onGroupChange}>
					{
						this.state.groups.map(({name}, i) => {
							return <option value={name} key={i}>{name}</option>;
						})
					}
				</select>
			</div>
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

	private onGroupChange = (e: React.FormEvent<HTMLSelectElement>) => {
		this.setState({
			selectedGroup: e.currentTarget.value
		});
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
