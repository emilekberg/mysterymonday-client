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
	}

	public componentDidMount() {
		Network.socket.on("add-restaurant", () => {
			this.updateRestaurants();
		});
		Network.socket.on("restaurant-score", (data: {status: "ok"|"failed", restaurants: Array<{name: string, average: number}>}) => {
			if(data.status === "failed") {
				return;
			}
			const {restaurants} = data;
			this.setState({
				restaurants
			});
		});
		Network.socket.on("selected-group", (data: {status: "ok"|"failed"}) => {
			if(data.status === "failed") {
				return;
			}
			this.updateRestaurants();
		});
		this.updateRestaurants();
	}

	public componentWillUnmount() {
		Network.socket.removeEventListener("add-restaurant");
		Network.socket.removeEventListener("restaurant-score");
	}

	public render() {
		return <div>
			<h3>Home</h3>
			<div>
				<div><Link to="/manage-restaurants">Manage Restuarants</Link></div>
				<div><Link to="/manage-group">Manage Group</Link></div>
			</div>
			<h4>All restaurants</h4>
			{this.renderTable()}
		</div>;
	}

	private updateRestaurants() {
		Network.socket.emit("get-restaurants-score");
	}

	private renderTable() {
		return <table>
			<thead>
				<tr>
					<th>restaurant name</th>
					<th>total average score</th>
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
		</table>;
	}
}
